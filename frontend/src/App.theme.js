import { createTheme } from '@mui/material/styles'

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#008cff',
    },
    secondary: {
      main: '#ff7700',
      light: '#fba056',
      dark: '#ad5203',
    },
    background: {
      default: '#353535',
      paper: '#fdfdfd',
    },
    text: {
      secondary: 'rgba(0,0,0,0.6)',
      primary: 'rgba(255,255,255,0.87)',
      hint: '#7367b3',
    },
  },
};

export default createTheme(themeOptions);