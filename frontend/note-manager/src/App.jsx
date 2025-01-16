import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Homes.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Notes from './pages/Notes.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida para las notas */}
          <Route path="/task" element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

