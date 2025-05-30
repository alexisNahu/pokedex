import './Styles.css'
import {Navbar} from '../../../components'

const Header = () => {
    const menuItems = ['About Me','Lets Play!']

    return (
        <header className="bg-primary w-75 mx-auto">
           <Navbar itemList={menuItems} /> 
        </ header>
    )
}

export default Header