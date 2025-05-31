import React from 'react'
import NavLink from './NavLink'

interface Props {
  icon: string,
  description: string
  id: string,
  items: Array<string>
}

function Dropdown({icon, description, id, items}: Props) {
  return (
    <>
      <a className='nav-link' href="#" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-controls={`${id}`}>
        <img src={`https://img.pokemondb.net/sprites/black-white/normal/${icon}.png`} alt="icon" width={90}/>
        <span className="description">{description} <i className="bi bi-caret-down-fill"></i> </span>
      </a>
      {
        items.forEach((item, i) => {
          return (
            <NavLink icon='charmander' description='dropdown item que se yo'/>
          )
        })
      }
    </>
  )
}

export default Dropdown