import { Button, Box, TextField } from '@mui/material'
//importamos iconos de material UI -> https://mui.com/material-ui/material-icons/?theme=Outlined
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
    return (
        <Box sx={{ marginBottom: 2, paddingX: 2}}>

            <Button
                startIcon={<AddCircleOutlineOutlinedIcon />}  //usamos el icono importado arriba para agregarlo al inicio
                fullWidth
                variant='outlined'
            >
                Agregar tarea
            </Button>
            {/* agregamos un TextField de Material Ui para que el usuario pueda introducir el texto */}
            <TextField
                fullWidth //hacemos que ocupe todo el espacio
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva entrada'
                helperText='Ingrese un valor' //texto de ayuda
            />
            <Box display='flex' justifyContent='space-between'>
                <Button
                    variant='text'
                >
                    Cancelar
                </Button>

                <Button
                    variant='outlined'
                    color='secondary'
                    endIcon={<SaveOutlinedIcon />} //usamos el icono importado arriba para agregarlo al final
                >
                    Guardar
                </Button>
            </Box>

        </Box>
    )
}
