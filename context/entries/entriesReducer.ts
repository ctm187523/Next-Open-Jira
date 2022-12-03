import { EntriesState} from './';
import { Entry } from '../../interfaces/entry';

//definimos las acciones con textos unicos
type EntriesActionType = 
| { type: '[Entry]  Add-Entry', payload: Entry } //en el payload recibimos un objeto Entry

//el reducer es una funcion pura porque todos sus valores de retorno los obtiene
//unicamente de los valores que recibe, no tiene ninguna interaccion con el mundo exterior
//recibe el estado de tipo EntriesState,definido en EntriesProvider.tsx que es un array de objetos Entry
// y la action del tipo de finido arriba EntriesActionType, devuelve un EntriesState
//el Reducer siempre devuelve un nuevo estado no una mutacion del estado usamos el spread (...) para ello
export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

   switch (action.type) {
        case '[Entry]  Add-Entry':
         return {
          ...state,
          entries: [...state.entries, action.payload ] //añadimos a las entradas un nuevo objeto Entry a traves del payload, creamos un nuevo estado no una mutacion usando el spread
       }

        default:
           return state;
    }
}