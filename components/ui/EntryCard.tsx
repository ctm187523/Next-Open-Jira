import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { FC } from "react";
import { Entry } from '../../interfaces/entry';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {


    return (
        <Card
            sx={{ marginBottom: 1}}
            //Eventos de drag
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
