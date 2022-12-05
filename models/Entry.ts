import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces/entry';

//definimos la interfaz que sera para tipar el Model(linea 27), hacemos que
//herede de la ya interfaz creada en interfaces/entry
interface IEntry extends Entry{}

//definimos el esquema de las entradas
const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        }
    }
});

//el backend se ejecuta dependiendo los request del usuario, si ya esta definido el esquema
//de arriba entrySchema no lo quiero volver a definir, creamos una constante de tipo Model
//importado arriba, el Entry sera el modelo creado(entrySchema), si existe el modelo sera igual
//al modelo creado, la primera vez que se ejecute no tendra ningun valor, por lo tanto
//si no tiene ningun valor lo creamos con la sentencia a la derecha de ||, usamos la variable Entry y le pasamos el 
//esquema creado arriba(entrySchema)
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel; //exportamos en EntryModel, el modelo

