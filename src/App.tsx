import {  Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities/RoutesWIthNotFound";
import {DescriptionPage, LandingPage} from "@pages/public"; // Asegúrate de importar este componente
import * as ROUTES from "@models/routes/routes";
import { useEffect } from "react";
import AuthGuard from "./guards/auth.guard";
import Private from "@pages/private/Private";
import {  User } from "@models/user.model";
import {  useSelector } from "react-redux";
import {  RootState } from "./redux/store";
import RegisterForm from "@components/Form/Register/RegisterForm";
import LoginForm from "@components/Form/Login/LoginForm";
import Logout from "@components/Form/Logout";
import { usePokemonNamesContext } from "@contexts/pokemonNames.context";
import { getPokemonNames } from "@services/pokemonNames.service";
import { UsersState } from "@redux/slices/user/reducers/user.reducer";
import * as userService from '@services/user.service'

function App() {
  const {pokemonList, setPokemonList} = usePokemonNamesContext()

  useEffect(() => {
    const loadNames = async () => {
      let names = localStorage.getItem('pokemonNames') ? JSON.parse(localStorage.getItem('pokemonNames') as string) : null

      if (!names) {
        names = await getPokemonNames()
        localStorage.setItem('pokemonNames', JSON.stringify(names))
      }

      setPokemonList(new Set(names))
    }

    loadNames()
  }, [])


  const userState: UsersState = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    console.log('users state', userState)
    console.log('pokemon list: ', pokemonList, pokemonList.has('charjabug'))
    console.log('favorites: ', userService.getActiveUser(userState)?.favorites)
  }, [userState, pokemonList])

 return (
    <RoutesWithNotFound>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to={ROUTES.PUBLIC.LANDING_PAGE} replace />} />
      
      {/* Rutas públicas accesibles siempre */}
      <Route path={ROUTES.PUBLIC.LANDING_PAGE} element={<LandingPage />} />
      <Route path={`${ROUTES.PUBLIC.DESCRIPTION}/:pokemonName`} element={<DescriptionPage />} />
      
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