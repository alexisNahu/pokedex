import LandingPage from '@pages/public'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthGuard(isLogged: boolean) { 
  return <Outlet />
}

export default AuthGuard