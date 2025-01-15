import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Traemos la información del usuario y el estado de carga desde el contexto

  // Mientras se valida el usuario, mostramos un componente de carga (spinner, texto, etc.)
  if (loading) {
    return <div>Loading...</div>; // Personaliza este spinner según tu diseño
  }

  // Si no hay un usuario autenticado, redirigimos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está correcto, renderizamos la ruta protegida
  return children;
};

export default ProtectedRoute;