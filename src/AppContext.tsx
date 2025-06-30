import React, { ReactNode } from 'react'
import { SidebarProvider } from './components/layout/sidebar/sidebar.context'
import { Layout } from './components'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ModalProvider } from '@components/Modal/context/ModalContext'
import { store } from './redux/store'
import { PokemonNamesProvider } from '@contexts/pokemonNames.context'

interface Props {
    children: ReactNode
}

function AppContext({children}: Props) {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <SidebarProvider>
                <PokemonNamesProvider>
                    <ModalProvider>
                        <Layout>
                            {children}
                        </Layout>
                    </ModalProvider>
                </PokemonNamesProvider>
            </SidebarProvider>
        </Provider>
    </BrowserRouter>
)
}

export default AppContext