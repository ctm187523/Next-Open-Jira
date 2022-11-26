import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


export const Navbar = () => {
    return (
        <AppBar position = 'sticky'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                >
                    {/* los iconos los hemos sacado de la pagina de Material UI https://mui.com/material-ui/material-icons/?theme=Outlined&query=menu 
                    ver link de importacion en linea 2*/}
                    <MenuOutlinedIcon />
                </IconButton>
                <Typography variant='h6'>OpenJira</Typography>
            </Toolbar>
        </AppBar>
    )
}
