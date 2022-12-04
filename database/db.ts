//instalamos mongoose con -> yarn add mongoose
import mongoose from 'mongoose';

/**
 * creamos la conexion
 * estados de la conexion
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 */

const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {

    if (mongooConnection.isConnected) { //es decir vale 1
        console.log('Ya estamos conectados');
        return;
    }

    //en el caso de que no estemos conectados revisamos moongose, miramos 
    //que no haya ninguna conexion adicional(connectios > 0), si hay alguna conexion
    //usamos esa conexion, conocemos su estado con readyState
    if (mongoose.connections.length > 0) {
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        //si es estado(readyState es 1 nos conectamos)
        if (mongooConnection.isConnected === 1) {
            console.log('Usando conexión anterior');
            return;
        }

        //en caso contrario si no es 1 nos desconectamos, para evitar tener muchas conexiones simultaneas
        await mongoose.disconnect();
    }

    //creamos una nueva conexion ya que nos habiamos anteriormente desconectado
    await mongoose.connect('...')
    mongooConnection.isConnected = 1;
    console.log('Conectado a MongoDB', '...');
}

//funcion para desconectar de la base de datos
export const disconnect = async () => {

    if (mongooConnection.isConnected !== 0) return; //cualquier conexion diferente de cero sale de la funcion
    await mongoose.disconnect();
    console.log('Desconectado de MongoDb');
}