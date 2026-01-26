import { createTheme } from '@mui/material/styles'

const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3E6F9F',
      light: '#648fb9',
      dark: '#073460',
    },
    secondary: {
      main: '#ff7700',
      light: '#fba056',
      dark: '#ad5203',
    },
    typography: {
      fontFamily: 'Source Sans Pro',
    },
    text: {
      primary: '#648FB9',
      secondary: '#ffffff',
      disabled: '#a2a2a2',
    },
  },
};

export default createTheme(themeOptions);
