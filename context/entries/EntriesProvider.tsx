import { FC, useReducer, ReactElement, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces/entry';

//he importado uuid con-> yarn add uuid para crear identificadores unicos mundiales
//ademas he importado para que trabaje con typeScript --> yarn add -D @types/uuid
//abajo la importacion una vez instado con los dos comandos anteriores
import { v4 as uuidv4 } from 'uuid';
import entriesAPi from '../../apis/entriesApi';

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
    const addNewEntry = async( description: string) => {
        //creamos un nuevo objeto con la descripcion recibida, de tipo Entry
        //lo comentamos es como lo haciamos antes de implementar los endpoints, no se guardaba en la base de datos
        // const newEntry: Entry = {
        //     _id: uuidv4(), //generamos el id usando la importacion de arriba linea 8
        //     description: description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        //creamos la peticion post con entriesApi(axios) hacia pages/api/entries/index.ts como haciamos con postman
        //el post esta tipado comn el Entry de las interfaces interfaces/entry
        //en el primer argumento mandamos la ruta a hacer el POST pages/api/entries/index.ts y el segundo arguemnto
        //es el body del POST que seria la descripcion recibida por parametro para crear una nueva entrada
        const { data } = await entriesAPi.post<Entry>('/entries' , { description: description} );
        console.log({ data })

        //llamamos al dispatch del reducer, le pasamos la data recibida de la peticion post
        dispatch({ type: '[Entry]  Add-Entry', payload: data });
    }

    //funcion que al hacer el drag and drop cambia el estatus del objeto al soltarlo en otra lista distinta
    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry]  Entry_Updated', payload: entry });
    }

    //funcion para cargar los archivos de la base de datos, solo una vez al cargar la aplicacion
    const refreshEntries = async() => {
        //hacemos la peticion usando el archivo creado en apis/entriesAPI donde hemos importado axios para las peticiones
        //hacemos un get a pages/api/entries/index.ts para la peticion, desestructuramos y obtenemos la data
        //tipamos el get con la interfaz interfaces/entry como un arreglo usamos la interfaz ya que estamos en el frontend, no el Entry de los modelos que es para Moongose en el backend
        const { data } = await entriesAPi.get<Entry[]>('/entries');
        //hacemos el dispatch al entriesReducer
        dispatch({ type: '[Entry]  Refresh_Data', payload: data});
    }

    //usamos un useEffect para la carga de archivos de la base de datos
    useEffect(() => {
        refreshEntries(); //llamamos a la funcion creada arriba
    }, []);

    return (
        //usamos el componente de Contexto(create Context) EntriesContext
        //definimos el value que es lo que se compartira con el resto de componentes
        //el children lo compondran los componentes incluidos en este Provider
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
        }}>
            { children}
        </EntriesContext.Provider>
    )
};