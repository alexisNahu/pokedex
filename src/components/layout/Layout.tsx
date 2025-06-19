import React, { forwardRef, ReactNode, useEffect, useRef } from 'react'
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
        <Sidebar items={sidebarItems} />
        <main 
          className="d-flex justify-content-center"
          style={{
            marginLeft: activo ? 360 : 140,
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh', // Asegura que ocupe toda la altura visible
            paddingTop: '2rem' // Para separación superior opcional
          }}
        >
          <div style={{ width: '100%', maxWidth: '1300px' }}>
            {children}
          </div>
        </main>
          
    </>
  )
}

export default Layout