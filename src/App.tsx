import {  Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import * as ROUTES from "@models/routes/routes";
import { useEffect } from "react";
import { mapToPokemonNamesDAO } from "@utilities/mappers/mapToPokemonNames";
import AuthGuard from "./guards/auth.guard";
import Private from "@pages/private/Private";
import {  User } from "@models/user.model";
import {  useSelector } from "react-redux";
import {  RootState } from "./redux/store";
import RegisterForm from "@components/Form/Register/RegisterForm";
import LoginForm from "@components/Form/Login/LoginForm";
import { initializeLocalStorageUser } from "@utilities/localStorage";
import { emptyUserState } from "./redux/slices/User";

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

  const userState: User[] = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    console.log(userState)
  }, [userState])

  return (
        <>
          <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={`${ROUTES.PUBLIC.LANDING_PAGE}`} />} />
            <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterForm />}></Route>
            <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginForm />}></Route>
            <Route path={`${ROUTES.PUBLIC.LANDING_PAGE}`} element={ <LandingPage />}/>
            <Route
              path={`${ROUTES.PUBLIC.DESCRIPTION}/:pokemonName`}
              element={<DescriptionPage />}
            />    
            <Route element={<AuthGuard isPrivate={true} />}>
              <Route path={`${ROUTES.PRIVATE.PRIVATE}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </>
  );
}
export default App