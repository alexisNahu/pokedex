import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import * as ROUTES from "@models/routes/routes";
import { useEffect } from "react";
import { mapToPokemonNamesDAO } from "@utilities/mappers/mapToPokemonNames";

function App() {
  useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(data => data.json())
      .then(data => mapToPokemonNamesDAO(data))
      .then(data => {
        localStorage.setItem('pokemonNames', JSON.stringify(data))
        return data;
      }) 
    }, [])


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