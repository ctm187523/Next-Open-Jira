import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC, DragEvent, useContext } from 'react';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from "next/router";
import { dateFunctions } from '../../utils';
import { getFormatDistanceToNow } from '../../utils/dateFunctions';


interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    //importamos el useContext de React para usar el UIContext y desestructurar
    //el startDragging y el endDragging
    const { startDragging, endDragging } = useContext(UIContext);

    //importamos el useRouter para poder navegar
    const router = useRouter();

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

    const onClick = () => {
        //usamos el useRouter importado arriba para acceder a pages/enties/[id].tsx el id lo recibimos de las props del componente
        router.push(`/entries/${ entry._id}`);
    }


    return (
        <Card
            onClick={ onClick } //llamamos a la funcion creada arriba
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
                    {/* usamos la funcion getFormatDistanceToNow de utils/dateFunctions para manejar las fechas */}
                    <Typography variant='body2'> { dateFunctions.getFormatDistanceToNow( entry.createdAt ) } </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
