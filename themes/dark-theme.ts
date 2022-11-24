import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

//creamos un tema para el ThemeProvider del archivo pages/_app.tsx
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#19857b'
        },
        error:{
            main: red.A400
        },
      },
  
      components: {
          
      }
  });
  