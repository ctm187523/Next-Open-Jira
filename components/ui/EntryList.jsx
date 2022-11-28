import { Paper, List } from "@mui/material"
import { EntryCard } from "./"

export const EntryList = () => {
    return (
        //usamos el div para porder hacer drop
        <div>
            {/* el overflow lo usamos para decir que hacer si el contenido desborda los extremos 
            superior y inferior en este caso le decimo que haga scroll*/}
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                {/* cambiara los estilos si hacemos drag o no */}
                <List sx={{ opacity: 1 }}>
                    {/* importamos EntryCard creado en este directorio */}
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                    <EntryCard />
                </List>
            </Paper>
        </div>
    )
}
