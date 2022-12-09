import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry } from '../models';
import { IEntry } from '../models/Entry';

//como parametro recibi el id de tipo String y devuelve una promesa que 
//puede ser de tipo IEntry de los modelos o null en caso de no encontrar respuesta
export const getEntryById = async( id: string): Promise<IEntry | null> => {

    //importamos isValidObjectId para comprobar si el id leido es valido
    //si no es valido no hacemos nada retornamos null
    if( !isValidObjectId(id)) return null;

    //si es valido el id establecemos la conexion a la base de datos
    await db.connect();

    //importamos el modelo Entry y buscamos si hay algun objeto con ese id, el metodo lean trae 
    //la informacion minima para poder trabajar, no manda todos los metodos disponibles
    const entry = await Entry.findById(id).lean();
    await db.disconnect(); //cerramos la informacion

    //retornamos la entrada, tenemos que convertirla a JSON serializarla ya que Monngose
    //el id el formato que pasa no es el correcto ver video final 153 y 154
    return JSON.parse( JSON.stringify(entry));
}