import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00b0ff',
      contrastText: '#e3f2fd',
    },
    secondary: {
      main: '#ff5722',
    },
    error: {
      main: '#ff1744',
    },
  },
});