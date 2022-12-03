import { UIState } from './';


//definimos las acciones on textos concretos
type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set isAddingEntry' , payload: boolean}


//el reducer es una funcion pura porque todos sus valores de retorno los obtiene
//unicamente de los valores que recibe, no tiene ninguna interaccion con el mundo exterior
//recibe el estado de tipo UIStAte y la action del tipo de finido arriba UIActionType, devuelve un UIState
//el Reducer siempre devuelve un nuevo estado no una mutacion del estado usamos el spread (...) para ello
export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true,
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false,
            }

            case 'UI - Set isAddingEntry':
                return {
                    ...state,
                    isAddingEntry: action.payload,
                }

        default:
            return state;
    }
}