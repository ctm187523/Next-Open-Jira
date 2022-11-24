import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

//creamos un tema para el ThemeProvider del archivo pages/_app.tsx
export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        //  usamos de fondo el grey importado arriba
          default: grey[300] 
      },
      primary: {
          main: '#4a148c'
      },
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
  