import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/axios';
import { AuthContext } from '../App.jsx';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signup({ username, password });
      authLogin(response.data.token, response.data.username);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      setError(message);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p className="auth-link">
        Already have an account? <span onClick={() => navigate('/login')}>Log in here</span>
      </p>
    </div>
  );
};

export default SignupPage;