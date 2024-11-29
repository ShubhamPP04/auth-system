// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import signupBg from '../assets/img2.jpg';
import './Auth.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      };
      await axios.post('http://localhost:5001/api/auth/register', submissionData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during signup');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-illustration" style={{ backgroundImage: `url(${signupBg})` }} />
      <div className="auth-form-container">
        <div className="auth-form-content">
          <h1>Create an account!</h1>
          <p className="auth-subtitle">Enter your details below to create an account and get started.</p>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder="enter..."
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="MM / DD / YY"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group col-6">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+91 1234567890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group col-6">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="enter..."
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="auth-submit-btn">
              Create account
            </button>

            <div className="auth-footer">
              Already have an account? <Link to="/login" className="auth-link">Login.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;