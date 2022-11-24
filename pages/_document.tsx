//archivo generado para el funcionamiento correcto de Next ver video 89
//con este archivo podemos extender funcionalidades, incluimos en el Head el link de la fuente de roboto
//este codiog lo he copiado del codigo fuente de la seccion -> https://github.com/Klerith/next-open-jira/tree/fin-seccion-7
//ya que el snippet no me funciona

import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initalProps = await Document.getInitialProps(ctx)
        return initalProps
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* incluimos la fuente de roboto de Material Ui apartado Google Web Fonts*/}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    {/* colocamos la imagen, el icono de Vercel que tiene la pestaña de la web */}
                    <link rel="shortcut icon" href="/favicon.ico" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument