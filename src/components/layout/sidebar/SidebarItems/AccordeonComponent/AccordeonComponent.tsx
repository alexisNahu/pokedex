import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './AccordeonComponent.css'

import type { DropdownItem } from '../../model';
import SidebarItem from '../SidebarItem';
import { useEffect, useRef, useState } from 'react';
import { useSidebarContext } from '../../sidebar.context';
import { getHidingTransition } from '../../Sidebar';

function AccordeonComponent({ item }: { item: DropdownItem }) {
  const safeId = item.text.replace(/\s+/g, '-').toLowerCase();
  const animatedSpriteUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${item.icon}.gif`

  const {activo} = useSidebarContext()
  const [clicked, setClickedState] = useState<boolean>(false)
  const [hoveredState, setHoveredState] = useState<boolean>(false)

  const collapseRef = useRef<HTMLDivElement | null>(null)
  const navLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const collapseContainer = collapseRef.current
    const navLink = navLinkRef.current

    collapseContainer?.classList.remove('show')
    navLink?.classList.toggle('cursor-pointer', activo)
    navLink?.classList.toggle('pe-none', !activo)
  }, [activo])

  const handleSpriteJumpingTransition = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    setClickedState(true)

    setTimeout(() => {
      setClickedState(false)
    }, 2000)
  }

  const navLinkHoverEffect = {
    transition: 'background-color .5s',
    backgroundColor: hoveredState ? '#4C5EEA' : 'transparent'
  }

  return (
    <div className='text-white accordeon' 
      style={navLinkHoverEffect}
      onMouseEnter={() => setHoveredState(true)}
      onMouseLeave={() => setHoveredState(false)}
      >
          <a className={`nav-link container h-100 fs-5`} 
             href="#" data-bs-toggle="collapse" 
             data-bs-target={`#${safeId}`} 
             aria-expanded="false" aria-controls={safeId} 
             onClick={handleSpriteJumpingTransition}
             ref = {navLinkRef}
             >
            <div className="row d-flex justify-content-center flex-row">
              <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <i className={`${item.bootstrapIcon} fs-3`}></i>
              </div>
              <div className='col-md d-flex justify-content-between align-items-center' style={getHidingTransition(activo)}>
                <span className='fw-bold'>{item.text}</span>
                <img src={animatedSpriteUrl} className={`${clicked ? 'bouncing' : 'not-bouncing'}`} alt="item" width={70}  />
              </div>
            </div>
          </a>
          <div className="collapse" id={safeId} ref = {collapseRef}>
            {item.items.map((s_item, i) => (
                  <SidebarItem item={s_item} key={i} />
              ))}
          </div>
    </ div>
  );
}

export default AccordeonComponent;
