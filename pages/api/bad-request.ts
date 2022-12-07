// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean;
  message: string | string[];
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

    //obtenemos el mensaje de la url con req.query en caso de que no venga usamos Bad Request
    const {message = 'Bad request'} = req.query;

  res.status(400).json(
    {
      ok: false,
      message //usamos el message obtenido arriba
    });
}
