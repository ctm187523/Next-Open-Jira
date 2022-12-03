import { Button, Box, TextField } from '@mui/material'
//importamos iconos de material UI -> https://mui.com/material-ui/material-icons/?theme=Outlined
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

   //usamos el useContext para obtener el contexto del UIContext 
   //desestructuramos para obtener el metodo setIsAddingEntry con el que 
   //controlaremos si el usuario pulsa el boton de agregar tarea para introducir una
   //nueva tarea y mostar o no el formulario para la entrada de datos de una nueva tarea
   //tambien usamos isAddingEntry para saber el estado si esta en false o true
   const { setIsAddingEntry, isAddingEntry  } = useContext(UIContext);

    //usamos el useState para manejar el texto introducido por el usuario para crear nuevas entradas
    const [inputValue, setInputValue] = useState('');

    //useState que usamos para cuando pierde el foco el formulario, pulsamos fuera del formulario cambia touched a true
    const [touched, setTouched] = useState(false);

    //usamos el useContext para recibir el contexto de en este caso en EntriesContext.tsx y desestructuramos la funcion addNewEntry
    const { addNewEntry } = useContext(EntriesContext);

    //funcion para manejar las entradas de texto del usuario, recibimos como
    //parametro el event del TextField de abajo lo tipamos como ChangeEvent que pude ser de 
    //tipo HTMLInputElement o HTMLTextAreaElement
    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value); //modificamos el inputValue con el texto introducido por el usuario para las entradas
    };

    //funcion para guardar la entrada 
    const onSave = () =>{
        if( inputValue.length === 0 ) return; //si esta vacio salimos del metodo

        addNewEntry(inputValue); //usamos el metodo addNewEntry del contexto del  EntriesContext importado arriba linea 20

        //restablecemos los valores uan vez introducida una nueva entrada
        setIsAddingEntry( false );
        setTouched( false );
        setInputValue(''); //restablecemos el inputValue a un string vacio
        
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {/* creamos una condicion usando el useState isadding de arriba si isAdding es true muestra 
        el formulario en caso contrario no lo muestra*/}

            {
                isAddingEntry ? (
                    <>
                        {/* agregamos un TextField de Material Ui para que el usuario pueda introducir el texto */}
                        <TextField
                            fullWidth //hacemos que ocupe todo el espacio
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={ inputValue.length <=0 && touched && 'Ingrese un valor'} //texto de ayuda, aparece si se cumple la condicion el Ingrese un valor
                            error={ inputValue.length <=0 && touched } //mostramos error colorando de rojo si el inputValue esta vacio y touched del useState de arriba es true
                            value={ inputValue } //usamos el useState de arrina inputValue
                            onChange={ onTextFieldChanged } //al cambiar el texto llamamos a la funcion de arriba
                            onBlur={() => setTouched(true)} //onBlur se dispara cuando pierde el foco si tocamos fuera del formulario, cambiamos el useState touched a true
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                onClick={() => setIsAddingEntry(false)} //al pulsar cambiamos el valor del useState isAdding creado arriba en false
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />} //usamos el icono importado arriba para agregarlo al final
                                onClick={ onSave } //usamos la funcion de arriba al salvar la entrada
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                )

                    : (

                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}  //usamos el icono importado arriba para agregarlo al inicio
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry(true)} //al pulsar cambiamos el valor del useState isAdding creado arriba en true
                        >
                            Agregar tarea
                        </Button>
                    )
            }
        </Box>
    )
}
