// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'

type Data = {
  message:string;
}

export default  async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

  // si en las varaibles de entorno de NODE_ENV esta en produnction no se ejecuta el codigo de abajo
  //para evitar purgar la base de datos en produccion
  if ( process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este servicio'})
  }


  await db.connect(); //nos conectamos a la base de datos importandola arriba en la linea 3

  await db.disconnect(); //nos desconectamos al finalizar el trabajo

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}
