import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './AccordeonComponent.css'

import type { DropdownItem } from '../model';
import SidebarItem from './SidebarItem';
import { useState } from 'react';
import { useSidebarContext } from '../sidebar.context';
import { getHidingTransition } from '../Sidebar';

function AccordeonComponent({ item }: { item: DropdownItem }) {
  const safeId = item.text.replace(/\s+/g, '-').toLowerCase();
  const animatedSpriteUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${item.icon}.gif`
  const {activo} = useSidebarContext()

  const [clicked, setClickedState] = useState<boolean>(false)

  const handleSpriteJumpingTransition = (e:any) => {
    e.preventDefault()
    
    setClickedState(true)

    setTimeout(() => {
      setClickedState(false)
    }, 2000)
  }

  return (
    <div className='text-white'>
          <a className={`nav-link container h-100 fs-5`} href="#" data-bs-toggle="collapse" data-bs-target={`#${safeId}`} aria-expanded="false" aria-controls={safeId} onClick={handleSpriteJumpingTransition}>
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
          <div className="collapse" id={safeId}>
            {item.items.map((s_item, i) => (
                  <SidebarItem item={s_item} />
              ))}
          </div>
    </ div>
  );
}

export default AccordeonComponent;
