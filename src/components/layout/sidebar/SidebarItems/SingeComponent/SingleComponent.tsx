import React from 'react'
import type { SingleItem } from '../../../../../models/sidebar.model'
import { useSidebarContext } from '../../sidebar.context'
import { getHidingTransition } from '../../Sidebar'
import { useNavigate } from 'react-router-dom'

function SingleComponent({item}: {item: SingleItem}) {
  const {activo} = useSidebarContext()

  const navigator = useNavigate()
  return (
    <div className='d-flex flex-row'>
      <button className='text-white btn bg-transparent' style={getHidingTransition(activo)} onClick={() => {item.url ? navigator(item.url) : null}}>{item.text}</button>
    </div>
  )
}

export default SingleComponent