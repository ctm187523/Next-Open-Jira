import { createContext} from 'react';
import { Entry } from '../../interfaces/entry';


//creamos una interfaz para mostrar como luce el contexto
interface ContextProps {
   entries: Entry[]; //tipamos las entradas con la interfaz ubicada en /interfaces/entry

   //Metodos
   addNewEntry: (description: string) => void; //añadimos el metodo creado en el entriesReducer
}


//creamos el contexto para crear el provider y poder pasar informacion entre componentes
//usamos la interfaz de arriba para mostrar que atributos maneja el contexto
//para refrescar ver video --> https://www.youtube.com/watch?v=UPCOJgLlr3w
export const EntriesContext = createContext({} as ContextProps );