import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import * as ROUTES from "@models/routes/routes";

function App() {
  return (
      <RoutesWithNotFound>
        <Route 
          path='/' 
          element={<Navigate to={`${ROUTES.PUBLIC.LANDING_PAGE}`} replace />} 
        />
        <Route
          path="/landingPage"
          element={<LandingPage />}
        >
        </Route>
        <Route
          path={`${ROUTES.PUBLIC.DESCRIPTION}/:pokemonName`}
          element={<DescriptionPage />}
        >
        </Route>
      </RoutesWithNotFound>
  );
}
export default App