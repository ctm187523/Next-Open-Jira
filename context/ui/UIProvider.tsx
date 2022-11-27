import { FC, ReactElement, useReducer } from "react"
import { UIContext, uiReducer } from "./"

//creamos la interfaz para las props del componente
interface Props {
    children: ReactElement | ReactElement[];
}

//creamos una interfaz para el tipado de las propiedades a compartir
export interface UIState {
    sidemenuOpen: boolean;
}

//usamos la interfaz creada arriba para el estado inicial
const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
}


export const UIProvider:FC<Props> = ({ children }) => {

    //usamos el Hook useReducer de React como estado inicial ponemos el objeto creado arriba
    //UI_INITIAL_STATE, como reducer usamos el creado en este mismo directorio uiReducer
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    //creamos una funcion donde usamos el dispatch y llama en el useReducer al uiReducer
    //le pasamos el tipo de accion que tiene que hacer en este caso type: 'UI - Open Sidebar' para abrir el sideBar
    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar'});
    }

    //metodo similar al anterior pero usa otro type para cerra el SideBar
    const closeSideMenu = () => {
        dispatch( { type: 'UI - Close Sidebar'});
    }

    return (
        //usamos el componente creado en este mismo directorio UIContext
        //definimos el value que es lo que se compartira con el resto de componentes le pasamos el state y las funciones
        //el children lo compondran los componentes incluidos en este Provider
       <UIContext.Provider value={{
           //estate
           ...state,

           //Methods
           openSideMenu,
           closeSideMenu
       }}>
           { children }
       </UIContext.Provider>
    )
}


