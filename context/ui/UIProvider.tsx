import { FC, ReactElement, useReducer } from "react"
import { UIContext, uiReducer } from "./"

//creamos la interfaz para las props del componente
interface Props {
    children: ReactElement | ReactElement[];
}

//creamos una interfaz para el tipado de las propiedades a compartir, lo
//usamos para tipar el estado inicial y en el ./uiReducers para tipar el state
//y el return 
export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

//usamos la interfaz creada arriba para crear un objeto para el  estado inicial
const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
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

    //funcion para cambiar el estado si el usuario añade una nueva entrada al pulsar el boton de agregar tarea, creado en components/ui/NewEntry
    //al cambiar el estado de true a false mostramos o no el formulario para añadir una nueva tarea
    const setIsAddingEntry = ( value: boolean) => {
        dispatch( { type: 'UI - Set isAddingEntry' , payload: value} )
    }

    //funcion para cambiar el estado del Dragging a true, usado en components/ui/EntryCard
    const startDragging = () => {
        dispatch({ type:'UI - Start Dragging'})
    }

    //funcion para cambiar el estado del Dragging a false, usado en components/ui/EntryCard
    const endDragging = () => {
        dispatch({ type:'UI - End Dragging'})
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
           closeSideMenu,
           
           setIsAddingEntry,

           startDragging,
           endDragging
       }}>
           { children }
       </UIContext.Provider>
    )
}


