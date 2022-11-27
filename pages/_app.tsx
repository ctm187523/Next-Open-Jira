import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme, darkTheme } from '../themes'
import { UIProvider } from '../context/ui';



//hemos instalado Material IU en consola con --> yarn add @mui/material @emotion/react @emotion/styled
//y los iconos con -> yarn add @mui/icons-material en el archivo _document.tsx hemos linkado la fuente Roboto
function MyApp({ Component, pageProps }: AppProps) {
  return (
    //colocamos en primer nivel el Provider llamado UIProvider creado en context/ui/UIProvider
    //para que todos los componentes en el metidos(Children) reciban la infomacion compartida
    <UIProvider>
      {/* colocamos el ThemeProvider de material UI, como theme usamos los credos en la carpeta themes */}
      <ThemeProvider theme={darkTheme}>
        {/* con este objeto CssBaseline de Material UI estandarizamos nuestro CSS baseline sin este objeto no funciona */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>


  )
}

export default MyApp;