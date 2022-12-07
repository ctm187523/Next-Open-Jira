//middleware exportado en -> https://nextjs.org/docs/advanced-features/middleware
//los middleware son funciones intermedias para validaciones

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// This function can be marked `async` if using `await` inside
//creamos este middleware que se ejecutara en las rutas especificadas en este caso en /api/entries/
//antes de que se ejecute esa ruta pasara por el middleware para comprobar que se cumplan ciertos requisitos
//en este caso queremos comprobar que el id sea un id de mongoose valido
export function middleware(req: NextRequest) {

    //comprobamos que entra en el path especificado aunque abajo en el metodo config ya lo habiamos echo
    if ( req.nextUrl.pathname.startsWith('/api/entries/')) {
        
        //obtenemos el id, removemos /api/entries/ del url para obtener solo el id
        const id = req.nextUrl.pathname.replace('/api/entries/','');
        
        //creamos una expresion regular para comprobar que el id es un formato de id de mongo
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        
        //comprobamos el id, si esta mal entra en el if
        if( !checkMongoIDRegExp.test(id)){
            const url = req.nextUrl.clone(); //clonamos el url
            url.pathname = '/api/bad-request'; //cambiamos el pathname al endpoint del bad-request creado en pages/api/bad-request
            url.search = `?message=${ id } is not a valid MongoId`; //colocamos un mensaje que sera recibido el bad-request
            return NextResponse.rewrite(url); //retornamos la nueva url y la redirigimos
        }
    }

   //console.log({ req: req.nextUrl.pathname});

    return NextResponse.next(); //funcion para que si pasa las validaciones continue ejecutando el codigo
}

// See "Matching Paths" below to learn more
//el codigo de abajo es para aplicar el middleware solo a las rutas especificadas
export const config = {
    matcher: [
        //'/api/:path',
        '/api/entries/:path/' //no olvidarse de la barra / ultima si no no funciona en el curso lo pone sin la barra final
    ]
}