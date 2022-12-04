import { Card, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {

  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);
  return (

    <Layout title="Home-OpenJira">
      <Grid container spacing={2}>
        {/* usamos las diferentes medidas de los diferentes dispositivos para xs que ocupe
        total que son las 12 unidades(columnas) en las que se divide el ancho de la pantalla y asi con
        las demas medidas, si no se ponen mas dimensiones toma la referencia de la mas pequeña(movile first)*/}
        <Grid item xs={12} sm={4}>
          {/* la altura ponemos que es el 100 por ciente del vh menos 100px del NavBar */}
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
              {/* Agregar una nueva entrada */}
              <NewEntry />
              {/* Listado de las entradas usamos el componente EntryList creado en components/ui*/}
              <EntryList status='pending'/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* la altura ponemos que es el 100 por ciente del vh menos 100px del NavBar */}
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En progreso" />
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* la altura ponemos que es el 100 por ciente del vh menos 100px del NavBar */}
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <EntryList status='finished'/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage;
