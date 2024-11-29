// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import loginBg from '../assets/img1.jpg';
import './Auth.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-illustration" style={{ backgroundImage: `url(${loginBg})` }} />
      <div className="auth-form-container">
        <div className="auth-form-content">
          <h1>Login</h1>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="enter your email..."
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="enter your password..."
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="auth-submit-btn">
              Login
            </button>

            <div className="auth-footer">
              Don't have an account? <Link to="/signup" className="auth-link">Sign up for free.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;