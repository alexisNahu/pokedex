// guards/auth.guard.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@redux';
import { PUBLIC } from '@models/routes/routes';

interface AuthGuardProps {
  isPrivate?: boolean;
}

function AuthGuard({ isPrivate = false }: AuthGuardProps) {
  const { activeUser } = useSelector((state: RootState) => state.user);
  
  // Si la ruta es privada y no hay usuario → redirige a login
  if (isPrivate && !activeUser) {
    return <Navigate to={PUBLIC.LOGIN} replace />;
  }
  
  // Si la ruta es pública (solo invitados) y hay usuario → redirige a home
  if (!isPrivate && activeUser) {
    return <Navigate to={PUBLIC.LANDING_PAGE} replace />;
  }
  
  // Si pasa las validaciones → renderiza el contenido
  return <Outlet />;
}

export default AuthGuard;