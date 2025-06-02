import React, { ReactNode, useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import { SidebarProvider, useSidebarContext } from './sidebar/sidebar.context'
import { sidebarItems } from './sidebar/sidebar.items'

interface Props {
    children: ReactNode,
}

function Layout({children}:Props) {
  const {activo} = useSidebarContext()

  return (
    <>
        <Sidebar items={sidebarItems}/>
        <main 
            className='d-flex justify-content-center align-items-center h-100'
            style={{
            marginLeft: activo ? 360 : 140,
            transition: 'margin-left 0.3s ease'
            }}
        >
            {children}
        </main>    
    </>
  )
}

export default Layout