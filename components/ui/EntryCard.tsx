import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC, DragEvent, useContext } from 'react';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    //importamos el useContext de React para usar el UIContext y desestructurar
    //el startDragging y el endDragging
    const { startDragging, endDragging } = useContext(UIContext)

    //usamos un que recibe el evento de los atributos del Card creado abajo
    //es de tipo DragEvent 
    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id); //obtenemos del event el metodo dataTransfer que nos permite  establecer informacion, ponemos con entry.id el identifiacdor del objeto que queremos hacer drag
        
        //modificamos el estado para indicar que hacemos drag usando el context de UIContext importado arriba
        startDragging();
    }

    //metodo para cancelar el on Drag
    const onDragEnd = () => {
        //modificamos el estado para indicar que finalizamos el  drag usando el context de UIContext importado arriba
        endDragging();
    }


    return (
        <Card
            sx={{ marginBottom: 1}}
            //Eventos de drag
            draggable //con esta propiedad hacemos que el componente sea draggable, se pueda coger y deslizar por la pantalla
            onDragStart = { onDragStart } //usamos el onDragStart y llamamos al metodo creado arriba onDragStart
            onDragEnd = { onDragEnd } //usamos el onDragEnd y llamamos al metodo creado arriba onDragEnd
        >
            {/* con cardActionArea al ser pulsado crea un efecto  al hacer click*/}
            <CardActionArea>
                <CardContent>
                    {/* el whiteSpace: 'pre-line' lo usamos para manejar los saltos de linea */}
                    <Typography sx={{ whiteSpace: 'pre-line'}}> { entry.description } </Typography>
                </CardContent>
                {/* con display: 'flex' y justifyContent: 'end' hacemos que el componete typography se situe al final */}
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                    <Typography variant='body2'>hace 30 minutos </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
