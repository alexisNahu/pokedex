import "bootstrap/dist/css/bootstrap.min.css";

import {Header} from './components'
import {Sidebar} from "./components";
import { sidebarItems } from "./components/layout/sidebar/sidebar.items";
import { SidebarProvider } from "./components/layout/sidebar/sidebar.context";

function App() {

  return (
    <SidebarProvider>
      <Sidebar items={sidebarItems}/>
    </ SidebarProvider>
  )
}

export default App
