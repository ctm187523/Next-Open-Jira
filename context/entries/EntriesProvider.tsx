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
        {
            _id: uuidv4(),//usamos la importacion de uuid de arriba linea 5 para usar id unicos
            description: 'Pendiente: Enim ea sunt ea pariatur elit adipisicing nostrud non. Excepteur veniam fugiat magna exercitation ullamco adipisicing labore.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),//usamos la importacion de uuid de arriba linea 5 para usar id unicos
            description: 'En Progreso: Consectetur proident duis do exercitation culpa aute dolore adipisicing exercitation nulla sit.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),//usamos la importacion de uuid de arriba linea 5 para usar id unicos
            description: 'Terminadas: Culpa ea cillum deserunt Lorem sit reprehenderit ullamco aliquip Lorem dolor amet sit quis.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    //usamos el Hook useReducer de React como estado inicial ponemos el objeto creado arriba
    //Entries_INITIAL_STATE, como reducer usamos el reducer creado EntriesReducer
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    return (
        //usamos el componente de Contexto(create Context) EntriesContext
        //definimos el value que es lo que se compartira con el resto de componentes
        //el children lo compondran los componentes incluidos en este Provider
        <EntriesContext.Provider value={{
            ...state
        }}>
            { children}
        </EntriesContext.Provider>
    )
};