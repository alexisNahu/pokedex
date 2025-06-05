import React from 'react'
import type { SingleItem } from '../../../../../models/sidebar.model'
import { useSidebarContext } from '../../sidebar.context'
import { getHidingTransition } from '../../Sidebar'

function SingleComponent({item}: {item: SingleItem}) {
  const {activo} = useSidebarContext()

  return (
    <div className='d-flex flex-row'>
      <button className='text-white btn bg-transparent' style={getHidingTransition(activo)}>{item.text}</button>
    </div>
  )
}

export default SingleComponent