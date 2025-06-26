import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import * as ROUTES from "@models/routes/routes";
import { useEffect } from "react";
import { mapToPokemonNamesDAO } from "@utilities/mappers/mapToPokemonNames";
import AuthGuard from "./guards/auth.guard";
import Private from "@pages/private/Private";
import Public from "@pages/public/Public";
import RoleGuard from "./guards/role.guard";
import { Rol, User } from "@models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { createUser } from "./redux/slices/User";
import Login from "@components/Auth/Login";
import RegisterForm from "@components/Form/RegisterForm";

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

  const userState: User = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    console.log(userState)
  }, [userState])

  return (
        <>
          <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={`${ROUTES.PUBLIC.LANDING_PAGE}`} />} />
            <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterForm />}></Route>
            <Route path={`${ROUTES.PUBLIC.LANDING_PAGE}`} element={ <LandingPage />}/>
            <Route
              path={`${ROUTES.PUBLIC.DESCRIPTION}/:pokemonName`}
              element={<DescriptionPage />}
            />    
            <Route path={`${ROUTES.PUBLIC.LOGIN}`} element={<Login />}/>
            <Route element={<AuthGuard isPrivate={true} />}>
              <Route path={`${ROUTES.PRIVATE.PRIVATE}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </>
  );
}
export default App