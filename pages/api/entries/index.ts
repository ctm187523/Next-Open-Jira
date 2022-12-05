// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';

//tipamos el Data de las diferentes maneras que puede tener
type Data =
    |{ message: string }
    | IEntry[] //exportamos la interfaz creada en models/Entry, para poder tipar las entries en el return del metodo creadao abajo getEntries

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res); //llamamos al metodo creado arriba si tenemos un GET

        //si hacemos una peticion distinta de GET muestra un error
        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}

//metodo que hace una peticion a la base de datos
const getEntries = async (res: NextApiResponse<Data>) => {

    //conectamos a la base de datos
    await db.connect();

    //hacemos la peticion a la base de datos importamos el modelo Entry de models/Entry
    //ejecutamos el comando find y ordenamos en orden ascendente por el atributo del Entry createdAt(la fecha de creacion)
    const entries = await Entry.find().sort({ createdAT: 'ascending' });

    //desconectamos de la base de datos
    await db.disconnect();

    res.status(200).json( entries ); //devolvemos las entradas
}
