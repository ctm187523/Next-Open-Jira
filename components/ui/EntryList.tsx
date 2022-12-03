import { Paper, List } from "@mui/material";
import { EntryCard } from ".";
import { EntryStatus } from '../../interfaces'
import { FC, useContext, useMemo, DragEvent } from 'react';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

//importamos los estilos creados en este directorio
import styles from './EntryList.module.css';


//interface para tipar las Props
interface Props {
    status: EntryStatus; //lo tipamos con el type de la carpeta interfaces/entry.ts
}

export const EntryList: FC<Props> = ({ status }) => {

    //usamos el contexto EntriesContext de donde obtenemos las entries y la funciom updateEntry
    const { entries, updateEntry } = useContext(EntriesContext);

    //importamos el useContext de React para usar el UIContext y desestructurar
    //el isDragging y el endDragging
    const { isDragging, endDragging } = useContext(UIContext)


    //filtramos las entradas, para que estas entradas tengan el status que recibimos como argumento
    //memorizamos la siguiente linea para que se ejecute la siguiente linea solo cuando las entradas cambien
    //no cada vez que se renderize usamos el useMemo para este fin, usamos como dependecia las entries
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    //metodo para permitir el drop
    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    //metodo para hacer el onDrop
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        //obtenemos el id del card que esta haciendo el drag, ver metodo onDragStart de Entry.Card.tsx
        const id = event.dataTransfer.getData('text');
        
        //usamos el metedo find del array entries para ver si tenemos algun elemento con el id 
        //de la linea de codigo de arriba que es el componente con el que hemos echo el drop
        //el signo de admiracion del final indica que siempre encontraremos un componente que coincida
        const entry = entries.find( e => e._id === id)!;
        entry.status = status; //modificamos el status del componente
        updateEntry( entry ); //usamos la funcio obtenida del contexto de EntriesContent
        endDragging(); //usamos la funcion endDraggind el contexto del UIContext

    }

    return ( 
        //usamos el div para porder hacer drop

        <div
            onDrop={onDropEntry} //llamamos a la funcion creada arrina onDropEntry
            onDragOver={allowDrop} //llamamos a la funcion creada arriba allowDrop para permitir que se pueda hacer drop
            className={ isDragging ? styles.dragging : ''} //cambiamos el estulo si isDragging esta en true usando los stylos creados en este directorio y importados arrinba
        >
            {/* el overflow lo usamos para decir que hacer si el contenido desborda los extremos 
            superior y inferior en este caso le decimo que haga scroll*/}
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                {/* cambiara los estilos si hacemos drag o no, si el isDragging esta en true si esta en true cambia la opacidad
                t con el transition hacemos que no sea brusco el cambio sino que lo realize en 0,3 segundos*/}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {/* importamos EntryCard creado en este directorio */}
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
