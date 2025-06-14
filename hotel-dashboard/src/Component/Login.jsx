import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com'; // ⬅️ Add EmailJS
import '../styles/login.css';

export const Login = () => {
  const [merchants, setMerchants] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch('https://backend.climescore.com/getisn-registration');
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
        toast.error('Error fetching merchant data. Please try again later.');
      }
    };

    fetchMerchants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = merchants.find(
      (merchant) => merchant.mobileNumber === mobileNumber && merchant.loginPin === loginPin
    );

    if (user) {
      login(user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      setError('Invalid mobile number or PIN');
      toast.error('Invalid mobile number or PIN');
    }
  };

const handleForgotPassword = () => {
  const user = merchants.find((merchant) => merchant.mobileNumber === mobileNumber.trim());

  if (!user) {
    toast.error('Mobile number not found!');
    return;
  }

  setLoading(true);

  const templateParams = {
    to_name: user.contactPerson || 'User',
    to_email: user.email,
    login_pin: user.loginPin,
  };

  console.log("Sending to:", templateParams); // 🧪 For testing

  emailjs
    .send(
      'service_rm6t0l9',
      'template_knh8u7c',
      templateParams,
      '4_SUObyufQCf-gtms'
    )
    .then(() => {
      toast.success('Login PIN sent to your registered email!');
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      toast.error('Failed to send email.');
      setLoading(false);
    });
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/esg'>
            <p style={{ color: 'blue' }}>Create an account</p>
          </Link>
         <p style={{ color: 'red', cursor: 'pointer' }} onClick={handleForgotPassword}>
  {loading ? 'Sending...' : 'Forgot password?'}
</p>

        </div>
        {error && <p className="error-message">{error}</p>}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
