import { createContext, useState, useEffect, useContext } from 'react';
import { getUserFromTokenAPI, login as loginUserAPI, register as registerUserAPI, logoutsession } from '../services/api';
import Cookies from "js-cookie";
//import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  user: null,
  IsAuthenticated:false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [IsAuthenticated, setIsAuthenticated] = useState (false)
  const [loading, setLoading] = useState(true);

  //let goTo = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await getUserFromTokenAPI(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUserAPI(email, password);      
       setUser(res.data);
       setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (username ,email, password) => {
    try {
      const  res  = await registerUserAPI(username,email, password);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message);
    }
  };

  const logout = async() => {
    try {
      await logoutsession()
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ IsAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

