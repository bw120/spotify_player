import { createTheme } from '@mui/material/styles'

const theme = createTheme({
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
    }
  },
  typography: {
    fontFamily: 'Inter Tight, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
});

const themeComponentOverrides = createTheme(theme, {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary
        }
      }
    }
  }
});

export default createTheme(themeComponentOverrides);
