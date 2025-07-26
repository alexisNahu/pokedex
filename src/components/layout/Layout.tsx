import { ReactNode, useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import { sidebarItems } from './sidebar/sidebar.items'
import { useSidebarContext } from './sidebar/sidebar.context'
import ProfileIcon from './ProfileIcon/ProfileIcon'
import { useMobileContext } from '@contexts/isMobile.context'

interface Props {
  children: ReactNode,
}

function Layout({ children }: Props) {
  const { activo } = useSidebarContext()
  const { isMobile } = useMobileContext()

  return (
    <>
      <Sidebar items={sidebarItems} />
      <main
        className="d-flex justify-content-center"
        style={{
          marginLeft: isMobile ? 0 : activo ? 360 : 100,
          marginTop: isMobile ? 80 : 0,  // un poco menos para que no quede muy abajo
          transition: 'margin-left 0.3s ease, margin-top 0.3s ease',
          padding: isMobile ? '0' : '1rem', // padding lateral en móvil para no pegar a bordes
          boxSizing: 'border-box', // importante para que el padding no aumente el ancho total
          overflowX: 'hidden' // evitar scroll horizontal accidental
        }}
      >
        <div
          className='d-flex align-items-center justify-content-center flex-column mx-auto'
          style={{
            width: '100%',
            maxWidth: '1500px',
            height: '100%'
          }}
        >
          {children}
        </div>

      </main>
    </>
  )
}


export default Layout
