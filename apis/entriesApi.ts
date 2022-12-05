//importamos axios para peticiones http con --> yarn add axios
import axios from 'axios';

const entriesAPi = axios.create({
    baseURL: '/api' //como la aplicacion sale del mismo host solo ponemos /api para que sea utilizado el endpoint en pages/api ya que todas las peticiones tienen el /api no tenemos que definir un path estricto ya que sale del mismo servidor no hace falta el http:// etc
});

export default entriesAPi;