import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export const Login = () => {
  const [merchants, setMerchants] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch('https://localitebackend.localite.services/getmerchants');
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };

    fetchMerchants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = merchants.find(
      (merchant) => merchant.contactPhoneNumber === mobileNumber && merchant.password === loginPin
    );

    if (user) {
      login(user.contactPhoneNumber); // Call login from AuthContext with user's phone number
      navigate('/dashboard'); // Use navigate for redirection
    } else {
      setError('Invalid mobile number or PIN');
    }
  };

  return (
    <div className="login-container" style={{ 
      backgroundImage: "url('/bg2.png')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <div id='centreimgdiv'>
      <img className='loginpinimg' src="Localite_icon.png" alt="" />
      {/* <img className='loginpinimg2' width="100px" src="/blue-logo.png" alt="" />
      <br />
      <p className='ptaglogin'>Your partner for Hyperlocal Marketing</p>
      <br /> */}
      <br />
      </div>
      <p className='lheading'>Login Page</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder='📞 Enter Mobile Number'
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="loginPin"
            value={loginPin}
            onChange={(e) => setLoginPin(e.target.value)}
            placeholder='🔐 Enter Login Pin'
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <p style={{color: 'red'}}>Forgot password?</p>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
