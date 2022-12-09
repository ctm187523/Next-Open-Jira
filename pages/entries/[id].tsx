import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import { Layout } from "../../components/layouts";

import { EntryStatus } from "../../interfaces";

//importamos los iconos
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';

//importamos para el usar el ServersideRendering
import { GetServerSideProps } from 'next';

import { dbEntries } from "../../database";
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from "../../utils";



//creamos una constante para los diferentes RadioButtons creados abajo
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

//interface para las Props recibidas desde abajo de la funcion getServerSideProps para manejar el serverSideRendering
interface Props {
    entry:Entry
}

export const EntryPage: FC<Props> = ( { entry }) => {


    //useState para el manejo del formulario
    const [inputValue, setInputValue] = useState( entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    //usamos el useContext para recibir los metodos de EntriesContext
    const { updateEntry, deleteEntry} = useContext(EntriesContext);

    //usamos el useMemo para usarlo en las validaciones de los forumularios, la condicion es que
    //si el inputValue es menor y igual a cero y touched esta en true la variable isNotValid sera true
    //las dependencias de cambio de los valores de la funcion son el inputValue y el touched al cambiar estos valores
    //el useMemo vuelve a memorizar los valores actualizados puede ser true o false dependiendo si se cumple o no la condicion
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);


    //funcion para manejar las entradas de texto del usuario, recibimos como
    //parametro el event del TextField de abajo lo tipamos como ChangeEvent que pude ser de 
    //tipo HTMLInputElement o HTMLTextAreaElement
    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value); //modificamos el inputValue con el texto introducido por el usuario para las entradas
    };

    //evento para manejar los RadioGroup con los diferentes estados
    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus); //modificamos el status de los RadioGroup y lo tipamos de tipo EntryStatus ya que recibimos un string
    }

    const onSave = () => {

        //si el inputValue vale cero no hacemos nada salimos del metodo
        if ( inputValue.trim().length === 0 )return;

        //modificamos los valores del Entry recibido del metodo de abajo getServerSideProps
        //con los valores actualizados a traves de los useStates y usamos finalmente
        //el metodo updateEntry recibido del useContext importado arriba
        const updatedEntry: Entry ={
            ...entry,
            status: status,
            description: inputValue
        }
        updateEntry(updatedEntry, true);
    }

    const onDelete = () => {
        
        deleteEntry( entry );
    }
    return (
        // para el titulo usamos una parte de la descripcion usando substring
        <Layout title={ inputValue.substring(0,20) + '...' }>
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
                            title={`Entrada: `}
                            // usamos la funcion getFormatDistanceToNow de utils/dateFunctions
                            subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt )}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue} //le damos el valor del inputValue de useState creado arriba
                                onBlur={() => setTouched(true)} //onBlur se dispara cuando pierde el foco si tocamos fuera del formulario, cambiamos el useState touched a true
                                onChange={onInputValueChanged} //llamamos a la funcion creada arriba con los cambio resgistados por el usuario
                                helperText={isNotValid && 'Ingrese un valor'} //usamos el useMemo creado arriba si es true el isNotValid se muestra el texto
                                error={isNotValid} //cambia el color si el isNotValid creado arriba usando el useMemo es true
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                {/* con la propiedad row del RadioGroup hacemos que se ponga en horizontal row(fila) */}
                                <RadioGroup
                                    row
                                    value={status} //le damos el valor del status del useState de arriba
                                    onChange={onStatusChanged} //llamamos a la funcion onStatusChanged para notificar los cambios de los RadioButtons
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)} //usamos capitalize para capitalizar el label
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0} //desabilitamos el boton si inputValue es menor que 0
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                onClick={ onDelete }
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark',
                }}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Layout>
    );
};


//usamos ServerSideRendering  para trabajar del lado del servidor, cuando alguien solicite
//esta pagina va a venir precargada con la informacion del lado del servidor
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //obtenemos el id del url del parametro ctx(context), lo tipamos como string
    const { id } = ctx.params as { id: string };

   //usamos de database/dbEntries la funcion getEntryById para obtner el objeto a traves del id
   const entry = await dbEntries.getEntryById( id )

    //si el entry es null ya no recargamos la pagina y devolvemos con redirect que
    //redireccione al inico
    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false, //false porque la pagina sigue existiendo
            }
        }
    }

    return {
        //las props son enviadas a este componente EntryPage por parametros
        props: {
            entry
        }
    }
}

export default EntryPage;
