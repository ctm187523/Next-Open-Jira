import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import { Layout } from "../../components/layouts";

import { EntryStatus } from "../../interfaces";

//importamos los iconos
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ChangeEvent, useState, useMemo } from 'react';

//creamos una constante para los diferentes RadioButtons creados abajo
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage = () => {

    //useState para el manejo del formulario
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStatus>('pending');
    const [touched, setTouched] = useState(false);

    //usamos el useMemo para usarlo en las validaciones de los forumularios, la condicion es que
    //si el inputValue es menor y igual a cero y touched esta en true la variable isNotValid sera true
    //las dependencias de cambio de los valores de la funcion son el inputValue y el touched al cambiar estos valores
    //el useMemo vuelve a memorizar los valores actualizados puede ser true o false dependiendo si se cumple o no la condicion
    const isNotValid = useMemo(() => inputValue.length <=0 && touched , [inputValue, touched]);


    //funcion para manejar las entradas de texto del usuario, recibimos como
    //parametro el event del TextField de abajo lo tipamos como ChangeEvent que pude ser de 
    //tipo HTMLInputElement o HTMLTextAreaElement
    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value); //modificamos el inputValue con el texto introducido por el usuario para las entradas
    };

    //evento para manejar los RadioGroup con los diferentes estados
    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus); //modificamos el status de los RadioGroup y lo tipamos de tipo EntryStatus ya que recibimos un string
    }

    const onSave = () => {
        console.log( { inputValue, status})
    }

    return (
        <Layout title=".... ... ....">
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                {/* creamos el responsive para las diferentes medidas de dispositivos 
                ocupen diferentes espacios*/}
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={ `Entrada: ${ inputValue }`}
                            subheader={`Creada hace: ... minutos`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={ inputValue } //le damos el valor del inputValue de useState creado arriba
                                onBlur={ () => setTouched( true )} //onBlur se dispara cuando pierde el foco si tocamos fuera del formulario, cambiamos el useState touched a true
                                onChange= { onInputValueChanged } //llamamos a la funcion creada arriba con los cambio resgistados por el usuario
                                helperText= { isNotValid && 'Ingrese un valor'} //usamos el useMemo creado arriba si es true el isNotValid se muestra el texto
                                error= { isNotValid } //cambia el color si el isNotValid creado arriba usando el useMemo es true
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                {/* con la propiedad row del RadioGroup hacemos que se ponga en horizontal row(fila) */}
                                <RadioGroup
                                    row
                                    value = { status } //le damos el valor del status del useState de arriba
                                    onChange = { onStatusChanged } //llamamos a la funcion onStatusChanged para notificar los cambios de los RadioButtons
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel 
                                                key={ option }
                                                value= { option }
                                                control={  <Radio />}
                                                label={ capitalize(option) } //usamos capitalize para capitalizar el label
                                            />
                                        ) )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick = { onSave }
                                disabled= { inputValue.length <=0 } //desabilitamos el boton si inputValue es menor que 0
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position:'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
            >
                 <DeleteOutlineOutlinedIcon/>                       
            </IconButton>
        </Layout>
    );
};

export default EntryPage;
