import axios from 'axios';
import { Alert } from 'react-native';
import { store } from '../store';
import { updateTokens, logout } from '../store/slices/authSlice';

// Placeholder for your backend URL
const BASE_URL = 'https://api.example.com/v1';

// Create a configured Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: Attach Access Token ─────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Read the current state from the Redux store
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Handle Refresh Token Rotation ──────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Detect if error is a 401 Unauthorized and this request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          // Attempt to fetch a new access token using the refresh token
          const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;

          // Dispatch updated tokens back to the Redux store
          store.dispatch(updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

          // Retry the precise request that failed previously but with the new token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If the refresh token is also expired or invalid, forcibly log the user out
          store.dispatch(logout());
          Alert.alert("Session Expired", "Your session has expired. Please log in again.");
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, so we just log out
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }

    // For all other errors, just bubble them up
    return Promise.reject(error);
  }
);

// ── Standard CRUD Functional Export Wrappers ──────────────────────────────
export const getRequest = (url: string, config = {}) => api.get(url, config);
export const postRequest = (url: string, data: any, config = {}) => api.post(url, data, config);
export const putRequest = (url: string, data: any, config = {}) => api.put(url, data, config);
export const deleteRequest = (url: string, config = {}) => api.delete(url, config);
export const patchRequest = (url: string, data: any, config = {}) => api.patch(url, data, config);

export default api;
