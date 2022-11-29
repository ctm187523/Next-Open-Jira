import { Paper, List } from "@mui/material";
import { EntryCard } from ".";
import { EntryStatus } from '../../interfaces'
import { FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';

//interface para tipar las Props
interface Props{
    status: EntryStatus; //lo tipamos con el type de la carpeta interfaces/entry.ts
}

export const EntryList:FC<Props> = ({ status }) => {

    //usamos el contexto EntriesContext de donde obtenemos las entries
    const { entries } = useContext( EntriesContext )

    //filtramos las entradas, para que estas entradas tengan el status que recibimos como argumento
    //memorizamos la siguiente linea para que se ejecute la siguiente linea solo cuando las entradas cambien
    //no cada vez que se renderize usamos el useMemo para este fin, usamos como dependecia las entries
    const entriesByStatus = useMemo( () => entries.filter ( entry => entry.status === status ), [ entries ]);
    
    return (
        //usamos el div para porder hacer drop
        <div>
            {/* el overflow lo usamos para decir que hacer si el contenido desborda los extremos 
            superior y inferior en este caso le decimo que haga scroll*/}
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                {/* cambiara los estilos si hacemos drag o no */}
                <List sx={{ opacity: 1 }}>
                    {/* importamos EntryCard creado en este directorio */}
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry }/> 
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
