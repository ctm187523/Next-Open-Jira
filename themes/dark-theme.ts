import { Elevator } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

//creamos un tema para el ThemeProvider del archivo pages/_app.tsx
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
    },

    //estilos para componentes
    components: {
        //cambiamos el estilo del Appbar de ui/Navbar para usar compontes ponemos
        //MuiNombreComponete en este caso como usamos el AppBar MuiAppBar
        MuiAppBar: {
            defaultProps: {
                //con elevation : 0 le quitamos la sombra del Navbar
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',
                    
                }
            }
        }
    }
});
