import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Component/Login';
import { AuthProvider } from './Component/AuthContex';
import ProtectedRoute from './Component/ProtectedRoute';

import { Navbar } from './Component/Navbar';
import { Dashboard } from './Component/Dashboard';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
      
    );
}

export default App;
