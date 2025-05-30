import React from 'react'
import type { DropdownItem, SingleItem } from '../model'
import SingleComponent from './SingleComponent'
import AccordeonComponent from './AccordeonComponent'


function SidebarItem({item}: {item: DropdownItem | SingleItem}) {
  if ('items' in item) {
    return <AccordeonComponent item={item} />
  } 

  return <SingleComponent item={item} />
}

export default SidebarItem