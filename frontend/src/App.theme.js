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
    typography: {
      fontFamily: 'Source Sans Pro',
      h1: {
        fontSize: '2.8rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2.5rem',
      },
      h3: {
        fontSize: '2rem',
      },
      h4: {
        fontSize: '1.9rem',
      },
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
