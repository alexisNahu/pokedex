
import { CardComponent, Layout } from "./components";
import { SidebarProvider } from "./components/layout/sidebar/sidebar.context";

function App() {

  return (
    <>
      <SidebarProvider>
        <Layout>
          <CardComponent />
        </Layout>
      </SidebarProvider>
    </>
  )
}

export default App
