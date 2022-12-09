import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import  NextLink from 'next/link'

export const Navbar = () => {

    //usamos el contexto creado en context/UI/UIContext para recibir el contexto del estado y sus funciones
    const { openSideMenu } = useContext(UIContext)


    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    //al pulsar el boton llamamos a la funcion openSideMenu recibida en el contexto del Provider
                    onClick={openSideMenu}
                >
                    {/* los iconos los hemos sacado de la pagina de Material UI https://mui.com/material-ui/material-icons/?theme=Outlined&query=menu 
                    ver link de importacion en linea 2*/}
                    <MenuOutlinedIcon />
                </IconButton>
                {/* hemos importado NextLink arriba pero no lo uso al ponerlo da error ver video 153 
                al no ponerlo parece que va mas lento al hacer click en OpenJira*/}
                    
                    <Link 
                        href="/" 
                        underline="none"
                        color="white"
                    >
                        <Typography variant='h6'>OpenJira</Typography>
                    </Link>
               
            </Toolbar>
        </AppBar>
    )
}
