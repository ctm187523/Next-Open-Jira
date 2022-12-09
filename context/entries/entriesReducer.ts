import { EntriesState } from './';
import { Entry } from '../../interfaces/entry';
import { PlaylistAddOutlined } from '@mui/icons-material';

//definimos las acciones con textos unicos
type EntriesActionType =
   | { type: '[Entry]  Add-Entry', payload: Entry } //en el payload recibimos un objeto Entry
   | { type: '[Entry]  Entry_Updated', payload: Entry }
   | { type: '[Entry]  Refresh_Data', payload: Entry[] } //type para cargar la informacion de la base de datos
   | { type: '[Entry]  Delete-Entry', payload: Entry } //type para borrar una entrada



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
            entries: [...state.entries, action.payload] //añadimos a las entradas un nuevo objeto Entry a traves del payload, creamos un nuevo estado no una mutacion usando el spread
         }
      //al hacer drag an drop modificamos el estado del objeto al que hemos echo drag and drop y su descripcion
      case '[Entry]  Entry_Updated':
         return {
            ...state,
            entries: state.entries.map(entry => {
               if (entry._id === action.payload._id) {
                  entry.status = action.payload.status;
                  entry.description = action.payload.description;
               }
               return entry; //retornamos la entrada modificada
            })
         }
         case '[Entry]  Refresh_Data':
            return {
               ...state,
               entries: [ ...action.payload ]
            }
         
         case '[Entry]  Delete-Entry':
            return {
               ...state,
               entries: state.entries.filter(( item ) => item._id !== action.payload._id)
            }
         
      default:
         return state;
   }
}