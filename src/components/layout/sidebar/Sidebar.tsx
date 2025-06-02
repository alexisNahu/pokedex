import React, { useContext, useEffect, useState } from 'react'
import type { DropdownItem, SingleItem, SidebarItemsType } from './model'
import SidebarItem from './SidebarItems/SidebarItem';
import './sidebar.css'
import { SidebarProvider, useSidebarContext } from './sidebar.context';

export const getHidingTransition = (activo: boolean) => {
  return {
    transition: 'opacity 0.1s',
    opacity: activo ? '100' : '0'
  }
}

function Sidebar({ items }: { items: SidebarItemsType }) {
  const {activo, setActivo} = useSidebarContext()

  const sidebarStyles = {
    width: activo ? '360px' : '100px',
    transition: 'all 0.3s',
    position: 'fixed' as const,
    height: '100vh',
    text: 'white',
    top: 0,
    left: 0,
    zIndex: 1000
  }

  const arrowStyles = {
    position: 'absolute' as const,
    height: 50,
    width: '50px',
    top: '0.5rem',
    right: '-1.5rem',
    alignSelf: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 1001 // encima del sidebar
  }

  return (
      <div className={`sidebar bg-poke-blue`} style={sidebarStyles}>
        <i className={`${activo ? 'bi bi-arrow-left' : 'bi bi-list'} bg-white text-dark p-1 d-flex justify-content-center align-items-center`} style={arrowStyles} onClick={() => setActivo(prev => !prev)}></i>

        <nav className='d-flex flex-column h-100'>
          <ul className='list-unstyled m-0 p-3'>
            {items.map((item, i) => (
              <li key={i} className='mb-2' style={{minHeight: 50}}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
  )
}


export default Sidebar;
