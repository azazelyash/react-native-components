export const Colors = {
    primary: '#637aff',
    primaryDark: '#2759ff',
    primaryLite: '#637aff99',

    black: '#112233',
    white: '#ffffff',

    accent: '#112233',

    green: '#19c5a8',
    green2: '#039a83',
    lightGreen: '#aaffaa',

    red: '#E66155',
    lightRed: '#ff4f7e',
    darkRed: '#d9365e',

    purple: '#8f06e4',

    blue: '#0984FF',
    skyBlue: 'skyblue',
    powderBlue: 'powderblue',
    steelBlue: 'steelblue',

    yellow: '#FEC10B',
    pink: '#ff4c98',
    gold: 'gold',

    gray: '#A0AEC0',
    darkGray: '#22313a',
    darkGray2: '#718096',

    light: '#fcfcfc',
    dark: '#333',

    line: '#282C35',
    darkHeaderColor: '#0e1616',

    darkOverlayColor: 'rgba(0,0,0,0.4)',
    darkOverlayColor2: 'rgba(0,0,0,0.8)',
    lightOverlayColor: 'rgba(255,255,255,0.6)',

    primaryAlpha: 'rgba(99,122,255,0.15)',
    redAlpha: 'rgba(255,84,84,0.15)',
    greenAlpha: 'rgba(96,197,168,0.15)',
    purpleAlpha: 'rgba(146,6,228,0.15)',

    bag1Bg: '#ea7a72',
    bag2Bg: '#c2c5d1',
    bag3Bg: '#82a7c9',
    bag4Bg: '#d49d8f',
    bag5Bg: '#ccd9c6',
    bag6Bg: '#767676',
    bag7Bg: '#d1c8c3',
    bag8Bg: '#dca47f',
    bag9Bg: '#eb849c',
    bag10Bg: '#979dc1',
    bag11Bg: '#c7d3c0',
} as const

export type ColorKeys = keyof typeof Colors