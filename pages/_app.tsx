import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme, darkTheme } from '../themes'


//hemos instalado Material IU en consola con --> yarn add @mui/material @emotion/react @emotion/styled
//y los iconos con -> yarn add @mui/icons-material en el archivo _document.tsx hemos linkado la fuente Roboto
function MyApp({ Component, pageProps }: AppProps) {
  return (
    //colocamos el ThemeProvider de material UI, como theme usamos los credos en la carpeta themes
    <ThemeProvider theme={ darkTheme }>
      {/* con este objeto CssBaseline de Material UI estandarizamos nuestro CSS baseline sin este objeto no funciona */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp;
