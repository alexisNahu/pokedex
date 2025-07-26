

import { useEffect, useState } from 'react'
import type { SidebarItemsType } from '@models/sidebar.model'
import SidebarItem from './SidebarItems/SidebarItem'
import { useSidebarContext } from './sidebar.context'
import { useMobileContext } from '@contexts/isMobile.context'

export const getHidingTransition = (activo: boolean): React.CSSProperties => {
  return {
    pointerEvents: activo ? 'auto' : 'none',
    opacity: activo ? 1 : 0,
    userSelect: activo ? 'auto' : 'none',
    transition: 'opacity 0.3s ease'
  }
}


function Sidebar({ items }: { items: SidebarItemsType }) {
  const { activo, setActivo } = useSidebarContext()
  const { isMobile } = useMobileContext()

  const sidebarStyles: React.CSSProperties = {
    width: isMobile ? '100%' : activo ? '360px' : '100px',
    height: isMobile ? (activo ? 'auto' : '60px') : '100vh',
    transition: 'all 0.3s ease',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'var(--bs-poke-blue)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
  }

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    height: 40,
    width: 40,
    top: isMobile ? '0.5rem' : '1rem',
    right: isMobile ? '1rem' : '-1.5rem',
    alignSelf: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 1001,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)'
  }

  return (
    <div
      className="sidebar"
      style={sidebarStyles}
      onMouseEnter={() => !isMobile && setActivo(true)}
      onMouseLeave={() => !isMobile && setActivo(false)}
    >
      <i
        className={`${activo ? 'bi bi-arrow-left' : 'bi bi-list'} text-dark`}
        style={arrowStyles}
        onClick={() => setActivo(prev => !prev)}
      />

      <nav className="d-flex flex-column w-100" style={{ height: activo ? 'auto' : '0'}}>
        <div style={isMobile ? getHidingTransition(activo) : {}}>
          <ul className={`list-unstyled m-0 p-3 d-flex ${isMobile ? 'flex-column' : 'flex-md-column'}`}>
            {items.map((item, i) => (
              <li key={i} className="mb-2" style={{ minHeight: 50 }}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default Sidebar

