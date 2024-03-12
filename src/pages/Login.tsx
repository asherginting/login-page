import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const isFormFilled = useMemo(() => {
    return email.trim() !== '' && password.trim() !== '';
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!isValidEmail) {
      setErrorMessage('Invalid email address!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://www.sample.app/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please try again!');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isValidEmail]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder='Email'
        />
      </div>
      <div className="form-group">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder='Password'
        />
        <span
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleLogin} className="btn-login" disabled={!isFormFilled || isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
