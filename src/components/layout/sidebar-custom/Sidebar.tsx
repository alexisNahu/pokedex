import React from 'react'
import NavLink from './components/NavLink'
import Dropdown from './components/Dropdown'

function Sidebar() {
  return (
    <div className='sidebar'>
      <NavLink icon="pokedex" description="Dashboard" />
      <NavLink icon="pokeball" description="Posts" />
      <NavLink icon="pokeball" description="Notifications" />
      <Dropdown icon="pokeball" description="Projects" id="submenu"/>
    </div>
  )
}

export default Sidebar