
//creamos dinamicamente dependiendo del id en la url 

import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../../database';
import { Entry } from '../../../../models';
import { IEntry } from '../../../../models/Entry';




type Data =
    | { message: string }
    | IEntry;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query; //con req.query obtenemos el id de la url, siempre las querys son strings

    //preguntamos si el id recibido es un objeto valido de moongose, si no lo es
    //por eso ponemos el signo de admiracion al principio, retornamos un mensaje de error y sale del metodo
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido ' + id });
    }

    //hacemos un swith dependiendo del metodo(GET,POST,ETC) que ha echo la peticion
    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res); //si es un PUT llamamos a la funcion para modificar la entrada

        case 'GET':
            return getEntry(req, res); //peticion get de un objeto en concreto por id

        case 'DELETE':
            return deleteEntry(req, res)

        default:
            return res.status(400).json({ message: 'Método ' + req.method + ' no existe ' });
    }

}

//este metodo nos servira tanto para modificar el status al hacer drag and drop
//como si queremos modificar la descripcion de la entrada
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query; //con req.query obtenemos el id de la url

    //conectamos a la base de datos
    await db.connect();

    //usamos Entry del modelo y comprobamos si existe un objeto en la base de datos con el id especificado
    const entryToUpdate = await Entry.findById(id);

    //si la entrada no se encuentra retornamos un mensaje de error y salimos
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID' + id });
    }

    //creamos una constante donde leemos el body del request si queremos modificar la description
    //usamos la que la va actualizar en caso contrario usamos la que ya lleva el objeto, para el status
    //lo mismo lo cambiamos si venimos de hacer drag and drop en caso contrario si no hay que modifcarlo usamos
    //el status que viene por defecto
    //aqui decimos que use la description que viene del req.body que son los datos actualizados
    //en caso de que no venga usamos la que ya tiene el objeto entryToUpdate.descrioption
    const { description = entryToUpdate.description,
        status = entryToUpdate.status, } = req.body;


    try {

        //Usamos el Modelo Entry con la funcion indByIdAndUpdate para por primer parametro pasarle el id del objeto a modificar
        // por segundo parametro le pasamos los campos a modificar 
        //por tercer parametro de forma opcional le mandamos el runValidations en true para decirle que solo use los campos especificados, en el estado solo use los 
        //campos especifiados y el new en true para que nos mande y no regrese la informacion actualizada
        const updateEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });

        //la linea de arriba podriamos haberla hecho tambien de otra manera como describo abajo, lo comento porque uso la de arriba
        //entryToUpdate.description = description;
        //entryToUpdate.status = status;
        //await entryToUpdate.save();

        res.status(200).json(updateEntry!); //le ponemos al updateEntry el signo de admiracion para decirle que nunca va a ser nulo
        await db.disconnect();

    } catch (error: any) {
        console.log({ error })
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message });
    }

}

//muestra un objeto unico por id de la base de datos
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query; //con req.query obtenemos el id de la url

    //conectamos a la base de datos
    await db.connect();

    //usamos Entry del modelo y comprobamos si existe un objeto en la base de datos con el id especificado
    const entryInDb = await Entry.findById(id);

    //desconectamos a la base de datos
    await db.disconnect();

    //si la entrada no se encuentra retornamos un mensaje de error y salimos
    if (!entryInDb) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID ' + id });
    }

    //mostramos el objeto encontrado
    res.status(200).json(entryInDb);



}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query; //con req.query obtenemos el id de la url

    await db.connect();
    const deleteEntry = await Entry.findByIdAndDelete(id);
    await db.disconnect(); 

     //si la entrada no se encuentra retornamos un mensaje de error y salimos
     if (!deleteEntry) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID ' + id });
    }
    
    res.status(200).json( { message: 'borrado'});
}

