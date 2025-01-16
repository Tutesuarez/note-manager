import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export const useAuth = () => {
  const { IsAuthenticated, user, login, logout, loading } = useContext(AuthContext);

  return {IsAuthenticated, user, login, logout, loading };
};
