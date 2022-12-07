import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import { Layout } from "../../components/layouts";
import { RadioButtonChecked } from "@mui/icons-material";
//importamos un icono 

import { EntryStatus } from "../../interfaces";

//importamos los iconos
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//creamos una constante para los diferentes RadioButtons creados abajo
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

export const EntryPage = () => {
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
                            title="Entrada:"
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
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                {/* con la propiedad row del RadioGroup hacemos que se ponga en horizontal row(fila) */}
                                <RadioGroup
                                    row
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
