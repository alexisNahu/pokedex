import React, { ReactNode } from 'react'
import { SidebarProvider } from './components/layout/sidebar/sidebar.context'
import { Layout } from './components'

interface Props {
    children: ReactNode
}

function AppContext({children}: Props) {
  return (
    <SidebarProvider>
        <Layout>
            {children}
        </Layout>
    </SidebarProvider>
)
}

export default AppContext