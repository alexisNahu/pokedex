import {  Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "@utilities";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import {PokedexPage, Private} from "@pages/private";
import * as ROUTES from "@models/routes/routes";
import { useEffect } from "react";
import AuthGuard from "./guards/auth.guard";
import {  useSelector } from "react-redux";
import {RegisterForm, LoginForm, Logout} from "@components/Form";
import { UsersState, RootState } from "@redux";
import * as userService from '@services'

function App() {
  const userState: UsersState = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    console.log('users state', userState)
    console.log('favorites: ', userService.getActiveUser(userState)?.favorites)
    console.log('teams', userService.getActiveUserTeams(userState))
  }, [userState])

 return (
    <RoutesWithNotFound>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to={ROUTES.PUBLIC.LANDING_PAGE} replace />} />
      
      {/* Rutas públicas accesibles siempre */}
      <Route path={ROUTES.PUBLIC.LANDING_PAGE} element={<LandingPage />} />
      <Route path={`${ROUTES.PUBLIC.DESCRIPTION}/:pokemonName`} element={<DescriptionPage />} />
      <Route path={`${ROUTES.PUBLIC.POKEDEX_ALL}`} element={<PokedexPage list="all"/>} />

      {/* Rutas solo para NO autenticados */}
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterForm />} />
      </Route>
      
      {/* Rutas solo para autenticados */}
      <Route element={<AuthGuard isPrivate={true} />}>
        <Route path={`${ROUTES.PRIVATE.PRIVATE}/*`} element={<Private />} />
        <Route path={ROUTES.PROTECTED.LOGOUT} element={<Logout />} />
      </Route>
    </RoutesWithNotFound>
  );
}
export default App