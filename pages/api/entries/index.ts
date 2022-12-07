// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';


//tipamos el Data de las diferentes maneras que puede tener
type Data =
    |{ message: string }
    | IEntry[] //exportamos la interfaz creada en models/Entry, para poder tipar las entries en el return del metodo creado abajo getEntries
    | IEntry //puede ser un unico objeto, en lugar de un array como arriba

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res); //llamamos al metodo creado arriba si tenemos un GET

        case 'POST':
            return postEntry( req, res); //metodo llamado al hacer post tenemos el parametro req y res, el req(request) para recibir el body de la peticion y del body obtenemos la data, res(responso) es la respuesta que proporcionamos al cliente

        case 'PUT':
            return postEntry( req, res); //metodo para hacer update de una entrada

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
   //importamos todo de la base de datos 
    const entries = await Entry.find().sort({ createdAT: 'ascending' });

    //desconectamos de la base de datos
    await db.disconnect();

    res.status(200).json( entries ); //devolvemos las entradas
}

const postEntry = async( req:NextApiRequest, res:NextApiResponse<Data>) => {

    //obtenemos el body de la request, si no tenemos description devolvemos un espacio en blanco
    //en la request tenemos la informacion de la persona que nos esta posteando, con console.log(req.body)
    //en postman podemos simularlo si al hacer el post añadimos en el apartado body con JSON el objeto a postear
    const { description = '' } = req.body;
    
    //creamos una instancia del modelo Entry en models/Entry, y usamos solamente
    //los parametros que nos interesa la description obtenida arriba en la request
    //y el createdAt lo creamos en este mismo instante con la fecha actual,
    //en el status no ponemos nada porque por defecto tal como esta codificado el
    //modelo Entry es pending
    const newEntry = new Entry( {
        description,
        createdAt: Date.now(),
    });

    //conectamos con la base de datos
    try {
        
        await db.connect();
        await newEntry.save(); //guardamos la nueva entrada
        await db.disconnect();

        return res.status(201).json( newEntry );
    } catch (error) {
        await db.disconnect();
        console.log(error);

        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor'})
    }

}
