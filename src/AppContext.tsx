import React, { ReactNode } from 'react'
import { SidebarProvider } from './components/layout/sidebar/sidebar.context'
import { Layout } from './components'
import { DescriptionProvider } from './contexts/description.context'
import { BrowserRouter } from 'react-router-dom'

interface Props {
    children: ReactNode
}

function AppContext({children}: Props) {
  return (
    <BrowserRouter>
        <DescriptionProvider>
            <SidebarProvider>
                <Layout>
                    {children}
                </Layout>
            </SidebarProvider>
        </DescriptionProvider>
    </BrowserRouter>
)
}

export default AppContext