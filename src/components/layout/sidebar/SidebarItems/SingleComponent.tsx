import React from 'react'
import type { SingleItem } from '../model'

function SingleComponent({item}: {item: SingleItem}) {
  return (
    <div className='d-flex flex-row'>
      <button className='text-white fw-bold btn bg-transparent'>{item.text}</button>
    </div>
  )
}

export default SingleComponent