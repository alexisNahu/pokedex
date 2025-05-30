import React from 'react'

interface Props {
  icon: string,
  description: string
  id: string
}

function Dropdown({icon, description, id}: Props) {
  return (
    <a className='nav-link' href="#" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-controls={`${id}`}>
      <img src={`/poke-icons/${icon}.png`} alt="icon" width={30}/>
      <span className="description">{description} <i className="bi bi-caret-down-fill"></i> </span>
    </a>
  )
}

export default Dropdown