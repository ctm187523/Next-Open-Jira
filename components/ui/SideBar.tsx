import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

//importamos icnones de Material UI -> https://mui.com/material-ui/material-icons/?theme=Outlined
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

//creamos un array que sera la lista del menu
const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

//creamos un SideBar para Material UI Drawer --> https://mui.com/material-ui/react-drawer/
export const SideBar = () => {
    return (
        <Drawer
            //con anchor le decimos donde queremos ubicarlo
            anchor="left"
            open={true} //le decimos con true que siempre esta abierto
            onClose={() => console.log('cerrando')} //le decimos lo que hara al cerrar el SideBar(Drawer), al clickar fuera se cierra
        >
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4"> Menu </Typography>
                </Box>
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
