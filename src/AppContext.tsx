import React, { ReactNode } from 'react'
import { SidebarProvider } from './components/layout/sidebar/sidebar.context'
import { Layout } from './components'
import { DescriptionProvider } from './contexts/description.context'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from '@components/Modal/context/ModalContext'

interface Props {
    children: ReactNode
}

function AppContext({children}: Props) {
  return (
    <BrowserRouter>
        <ModalProvider>
            <DescriptionProvider>
                <SidebarProvider>
                    <Layout>
                        {children}
                    </Layout>
                </SidebarProvider>
            </DescriptionProvider>
        </ModalProvider>
    </BrowserRouter>
)
}

export default AppContext