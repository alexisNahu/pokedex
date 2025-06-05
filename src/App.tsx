
import LandingPage  from "@pages/public";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";

function App() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path='/' element={<LandingPage />} />
      </RoutesWithNotFound>
    </BrowserRouter>
  )
}

export default App
