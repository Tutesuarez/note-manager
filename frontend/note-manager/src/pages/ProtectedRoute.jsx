import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import {Spinner} from 'react-bootstrap'

const ProtectedRoute = ({ children }) => {
  const { IsAuthenticated, loading } = useAuth(); // Traemos la información del usuario y el estado de carga desde el contexto

  // Mientras se valida el usuario, mostramos un componente de carga
  if (loading) {
    return <div> <Spinner animation="grow" variant="dark" /></div>; 
  }

  // Si no hay un usuario autenticado, redirigimos al login
  if (!IsAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está correcto, renderizamos la ruta protegida
  return children;
};

export default ProtectedRoute;