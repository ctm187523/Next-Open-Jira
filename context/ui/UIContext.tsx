import { createContext } from "react";

//creamos una interfaz para mostrar como luce el contexto
interface ContextProps {
    sidemenuOpen: boolean; //esta propiedad controla cuando esta abierto o cerrado el sideBar(Drawer)
    isAddingEntry: boolean; //propiedad para controlar si el usuario a pulsado el boton de agregar tarea y asi mostar el formulario de entrada o no, accion realizada en components/ui/NewEntry.tsx

    //Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (value: boolean) => void;
}

//creamos el contexto para crear el provider y poder pasar informacion entre componentes 
//usamos la interfaz de arriba para mostrar que atributos maneja el contexto, usamos createContext de React importado arriba
//para refrescar ver video --> https://www.youtube.com/watch?v=UPCOJgLlr3w
export const UIContext = createContext({} as ContextProps );





