import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

//importamos icnones de Material UI -> https://mui.com/material-ui/material-icons/?theme=Outlined
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useContext } from "react";
import { UIContext } from '../../context/ui/UIContext';

//creamos un array que sera la lista del menu
const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

//creamos un SideBar para Material UI Drawer --> https://mui.com/material-ui/react-drawer/
export const SideBar = () => {

    //vamos a usar el contexto de context/ui usando el hook de React useContext
    //ponemos el UIContext como el elemento a que utilizamos para el contexto, usamos sus propiedades
    const { sidemenuOpen, closeSideMenu } = useContext( UIContext );
    return (
        <Drawer
            //con anchor le decimos donde queremos ubicarlo
            anchor="left"
            open={ sidemenuOpen } //usamos el contexto de la linea 17 para conocer el estado en caso de que este en true despliega el sideBar
            onClose={ closeSideMenu } //le decimos lo que al cerrar ejecute el metodo closeSideMenu importado del context del Provider
        >
            <Box sx={{ width: 200 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4"> Menu </Typography>
                </Box>
                <List>
                    {/* usamos la lista menuItems creada arriba */}
                    {
                        // ponemos parentesis en el map porque devolvemos un tsx
                        //la propiedad button convierte los items en botones
                        menuItems.map((text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    {/* en funcion de si es par o no usamos un icono o otro */}
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                                </ListItemIcon>
                                {/* colocamos el texto del menu */}
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>


                {/* crea una linea divisoria en el menu */}
                <Divider />

                <List>
                    {/* usamos la lista menuItems creada arriba */}
                    {
                        // ponemos parentesis en el map porque devolvemos un tsx
                        menuItems.map((text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    {/* en funcion de si es par o no usamos un icono o otro */}
                                    {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                                </ListItemIcon>
                                {/* colocamos el texto del menu */}
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
