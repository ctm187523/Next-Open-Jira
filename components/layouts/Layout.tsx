
import React, { FC } from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'
import { Navbar, SideBar } from '../ui'


//definimos las props
interface Props {
    title?: string;
    children: any
}


export const Layout:FC<Props> = ({ title = 'OpenJira', children }) => {
    return (
        //importamos Box de Material UI, sx es como el style y tiene acceso al theme creado
        //por mi en, el FlexFlow para que se extienda lo mas posible
        <Box sx={{ flexFlow: 1}}>
            <Head>
                <title> { title }</title>
            </Head>

            {/* importamos Navbar de Navbar de ui/Navbar*/}
            <Navbar />
            {/* importaamos el Sidebar de ui/Sidebar para MaterialUI es Drawer el SideBar*/}
            <SideBar />

            <Box sx={ { padding: '10px 20px'}}>
                { children }
            </Box>
        </Box>
    )
}
