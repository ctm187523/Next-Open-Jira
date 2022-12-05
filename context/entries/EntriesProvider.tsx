import { FC, useReducer, ReactElement } from 'react';
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces/entry';

//he importado uuid con-> yarn add uuid para crear identificadores unicos mundiales
//ademas he importado para que trabaje con typeScript --> yarn add -D @types/uuid
//abajo la importacion una vez instado con los dos comandos anteriores
import { v4 as uuidv4 } from 'uuid';

//creamos la interfaz para las props del componente
interface Props {
    children: ReactElement | ReactElement[];
}

//creamos una interfaz para el tipado de las propiedades a compartir, lo
//usamos para tipar el estado inicial y en el ./uiReducers para tipar el state
//y el return 
export interface EntriesState {
    entries: Entry[]; //tipamos las entradas con la interfaz ubicada en /interfaces/entry
}

//usamos la interfaz creada arriba para tipar el estado inicial
const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        //las entradas que habia de inicio ahora se alojan en database/seed.data.ts
    ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    //usamos el Hook useReducer de React como estado inicial ponemos el objeto creado arriba
    //Entries_INITIAL_STATE, como reducer usamos el reducer creado EntriesReducer
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    //creamos una funcion para añadir nuevas entradas, recibe una descripcion de tipo string
    const addNewEntry = ( description: string) => {
        //creamos un nuevo objeto con la descripcion recibida, de tipo Entry
        const newEntry: Entry = {
            _id: uuidv4(), //generamos el id usando la importacion de arriba linea 8
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        //llamamos al dispatch del reducer
        dispatch({ type: '[Entry]  Add-Entry', payload: newEntry});
    }

    //funcion que al hacer el drag and drop cambia el estatus del objeto al soltarlo en otra lista distinta
    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry]  Entry_Updated', payload: entry });
    }

    return (
        //usamos el componente de Contexto(create Context) EntriesContext
        //definimos el value que es lo que se compartira con el resto de componentes
        //el children lo compondran los componentes incluidos en este Provider
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry
        }}>
            { children}
        </EntriesContext.Provider>
    )
};