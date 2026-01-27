import { createTheme } from '@mui/material/styles'

const palette = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3E6F9F',
      light: '#648fb9',
      dark: '#073460',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ff7700',
      light: '#fba056',
      dark: '#ad5203',
      contrastText: '#fff',
    },
    typography: {
      fontFamily: 'Source Sans Pro',
    },
    text: {
      primary: '#648FB9',
      secondary: '#ffffff',
      disabled: '#a2a2a2',
      contrastText: '#fff',
    },
  }
});

const themeComponentOverrides = createTheme(palette, {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: palette.palette.text.secondary
        }
      }
    }
  }
});

export default createTheme(themeComponentOverrides);
