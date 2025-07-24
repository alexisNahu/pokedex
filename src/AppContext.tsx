import React, { ReactNode } from 'react'
import { SidebarProvider } from './components/layout/sidebar/sidebar.context'
import { Layout } from './components'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ModalProvider } from '@components/Modal/context/ModalContext'
import { store } from './redux/store'
import ReactQueryProvider from '@components/ReactQueryProvider'

interface Props {
    children: ReactNode
}

function AppContext({children}: Props) {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <ReactQueryProvider>
                <SidebarProvider>
                        <ModalProvider>
                            <Layout>
                                {children}
                            </Layout>
                        </ModalProvider>
                </SidebarProvider>
            </ReactQueryProvider>
        </Provider>
    </BrowserRouter>
)
}

export default AppContext