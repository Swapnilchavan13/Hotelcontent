import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './Component/Login';
import { AuthProvider } from './Component/AuthContex';
import ProtectedRoute from './Component/ProtectedRoute';
import { Navbar } from './Component/Navbar';
import { Dashboard } from './Component/Dashboard';
import { Home } from './Component/Home';
import { CMSDashboard } from './Component/CMSDashboard';
import { DetailPage } from './Component/DetailPage';
import { AllItems } from './Component/Allitems';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer 
          position="top-center" // Center the toast notifications at the top
          autoClose={1000} 
          hideProgressBar 
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="custom-toast" // Apply custom CSS class
        />
        <Routes>
        <Route path="/" element={<Navigate to="/esg" />} /> {/* Redirect from / to /esg */}
          <Route path="/esg" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cms" element={<CMSDashboard />} />
          <Route path='/detail/:title' element={<DetailPage />} />
          <Route path='/allitems/:subCategory' element={<AllItems />} />
          <Route path="/dashboard"  element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
