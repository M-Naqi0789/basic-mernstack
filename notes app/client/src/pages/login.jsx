import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/axios';
import { AuthContext } from '../App.jsx';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login({ username, password });
      authLogin(response.data.token, response.data.username);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
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
        <button type="submit" className="btn-primary">Log In</button>
      </form>
      <p className="auth-link">
        Don't have an account? <span onClick={() => navigate('/signup')}>Sign up here</span>
      </p>
    </div>
  );
};

export default LoginPage;