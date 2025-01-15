import { createContext, useState, useEffect, useContext } from 'react';
import { getUserFromTokenAPI, login as loginUserAPI, register as registerUserAPI, logoutsession } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserFromTokenAPI();
  
        console.log('response en useEffect', response.data.user);
  
        // Verifica que la estructura de la respuesta contiene un usuario
        if (response.data && response.data.user) {
          setUser(response.data.user); // Establecer el usuario en el estado
        }
      } catch (error) {
        console.error(
          'No se pudo cargar el usuario desde el token:',
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false); // Carga completada
      }
    };
  
    const hasToken = document.cookie.includes('tokenBE');
  if (hasToken) {
    fetchUser();
  } else {
    setLoading(false); // Si no hay token, terminamos la carga
  }
  }, []);


  const login = async (email, password) => {
    try {
      const  {data}  = await loginUserAPI(email, password); // Asegúrate de que loginUserAPI devuelva la respuesta correcta
      console.log('data de usuario después del login', data);
      
      await fetchUser();
    
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
    }
  };

  const register = async (username ,email, password) => {
    try {
      const  data  = await registerUserAPI(username,email, password);
      await fetchUser()
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message);
    }
  };

  const logout = async() => {
    try {
      await logoutsession()
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

