import React from 'react'
import NavLink from './components/NavLink'
import Dropdown from './components/Dropdown'

function Sidebar() {
  return (
    <div className='sidebar'>
      <NavLink icon="bulbasaur" description="Dashboard" />
      <NavLink icon="charmander" description="Posts" />
      <NavLink icon="squirtle" description="Notifications" />
      <Dropdown icon="ditto" description="Projects" id="submenu" items=['s']/>
    </div>
  )
}

export default Sidebar