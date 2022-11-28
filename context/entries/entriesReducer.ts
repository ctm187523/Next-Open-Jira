import { EntriesState} from './';

//definimos las acciones on textos concretos
type EntriesActionType = 
| { type: '[Entries] - ActionName'}

//el reducer es una funcion pura porque todos sus valores de retorno los obtiene
//unicamente de los valores que recibe, no tiene ninguna interaccion con el mundo exterior
//recibe el estado de tipo EntriesStAte y la action del tipo de finido arriba EntriesActionType, devuelve un EntriesState
//el Reducer siempre devuelve un nuevo estado no una mutacion del estado usamos el spread (...) para ello
export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

   switch (action.type) {
    //    case '[Entries] - ActionName':
    //       return {
    //       ...state,
    //    }

        default:
           return state;
    }
}