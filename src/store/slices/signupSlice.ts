import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupState {
  step: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pin: string;
  isComplete: boolean;
}

const initialState: SignupState = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pin: '',
  isComplete: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.step < 3) state.step += 1;
    },
    prevStep(state) {
      if (state.step > 1) state.step -= 1;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    updateFormData(state, action: PayloadAction<Partial<SignupState>>) {
      return { ...state, ...action.payload };
    },
    completeSignup(state) {
      state.isComplete = true;
    },
    resetSignup(state) {
      return initialState;
    }
  },
});

export const { nextStep, prevStep, setStep, updateFormData, completeSignup, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
