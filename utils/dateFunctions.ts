//para manejar las fechas hemos importado el paquete com -> yarn add date-fns
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'

export const getFormatDistanceToNow = ( date: number ) =>{

    //usamos la importacion de arriba formatSistanceToNow y le mandamos la fecha recibida por parametro
    //como segundo parametro ponemos el idioma que queremos utilizar en este caso español
    const fromNow = formatDistanceToNow( date, { locale: es});

    return `hace ${fromNow}`;
}