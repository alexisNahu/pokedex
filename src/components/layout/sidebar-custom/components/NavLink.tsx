

interface Props {
  icon: string,
  description: string
}

function NavLink({icon, description}:Props) {
  return (
    <a className='nav-link' href="#">
        <span className="pokesprite pokemon charmander" style={{
      display: 'inline-block',
      transform: `scale(20)`,
      transformOrigin: 'top left',
      margin: '4px',
    }}>
        </span>
        <span className='description'>{description}</span>
    </a>
  )
}

export default NavLink