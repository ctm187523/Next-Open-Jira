import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    
  <Layout>
    {/* usamos el componente Typography de material UI en lugar de por ejemplo h1
    tiene mayores ventajas como responsive usamos como el color el primary definido en 
    themes/light-theme */}
    <Typography variant='h1' color='primary'> Hola mundo </Typography>
  </Layout>
  )
}

export default HomePage;
