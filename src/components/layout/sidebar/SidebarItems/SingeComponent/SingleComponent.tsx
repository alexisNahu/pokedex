import type { SingleItem } from '@models/sidebar.model'
import { useSidebarContext } from '../../sidebar.context'
import { getHidingTransition } from '../../Sidebar'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useRef } from 'react'
import { PUBLIC } from '@models/routes/routes'
import AutoSuggestionsInput from '@components/layout/AutoSuggestionsInput/AutoSuggestionsInput'

function SingleComponent({item}: {item: SingleItem}) {
  const {activo} = useSidebarContext()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const navigator = useNavigate()


  if (item.type === 'input') return <AutoSuggestionsInput />
  

  return (
    <div className='d-flex flex-row'>
      <button className='text-white btn bg-transparent' style={getHidingTransition(activo)} onClick={() => {item.url ? navigator(item.url) : null}}>{item.text}</button>
    </div>
  )
}

export default SingleComponent