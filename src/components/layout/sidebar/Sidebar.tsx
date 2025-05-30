import React from 'react'
import type { DropdownItem, SingleItem, SidebarItemsType } from './model'
import SidebarItem from './SidebarItems/SidebarItem';
import './sidebar.css'

function Sidebar({ items }: { items: SidebarItemsType }) {
  return (
    <div className='sidebar w-25 vh-100 bg-poke-blue text-white'>
      <nav className='d-flex flex-column h-100'>
        <ul className='list-unstyled m-0 p-3'>
          {
            items.map((item, i) => (
              <li key={i} className='mb-2'>
                <SidebarItem item={item} />
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar;
