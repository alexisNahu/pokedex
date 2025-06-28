import {ReactNode} from 'react'
import Sidebar from './sidebar/Sidebar'
import { sidebarItems } from './sidebar/sidebar.items'
import { useSidebarContext } from './sidebar/sidebar.context'
import ProfileIcon from './ProfileIcon/ProfileIcon'

interface Props {
    children: ReactNode,
}

function Layout({children}:Props) {
  const {activo} = useSidebarContext()

  return (
    <>
        <Sidebar items={sidebarItems} />
        <main 
          className="d-flex justify-content-center"
          style={{
            marginLeft: activo ? 360 : 140,
            transition: 'margin-left 0.3s ease',
            minHeight: '100vh', // Asegura que ocupe toda la altura visible
          }}
        >
          <div className='d-flex align-items-center' style={{ width: '100%', maxWidth: '1300px' }}>
            {children}
          </div>
          <ProfileIcon />
        </main> 
    </>
  )
}

export default Layout