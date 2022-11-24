import { Typography } from '@mui/material';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    //usamos el componente Typography de material UI en lugar de por ejemplo h1
    //tiene mayores ventajas como responsive usamos como el color el primary definido en 
    //themes/light-theme
   <Typography variant='h1' color='primary'>Hola Mundo</Typography>
  )
}

export default HomePage;
