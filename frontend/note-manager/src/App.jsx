import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Homes.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Notes from './pages/Notes.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Ruta protegida para la página principal */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para las notas */}
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <PublicRoutes/>
          <ProtectedRoutes/> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

