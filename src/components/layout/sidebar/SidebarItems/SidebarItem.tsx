import type { DropdownItem, SingleItem } from '@models/sidebar.model'
import SingleComponent from './SingeComponent/SingleComponent'
import AccordeonComponent from './AccordeonComponent/AccordeonComponent'


function SidebarItem({item}: {item: DropdownItem | SingleItem}) {
  if ('items' in item) {
    return <AccordeonComponent item={item} />
  } 

  return <SingleComponent item={item} />
}

export default SidebarItem