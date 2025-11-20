import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App.jsx';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-title">
        <h2>Basic Notes App</h2>
      </Link>
      <nav>
        {user ? (
          <div className="header-nav">
            <span className="username-display">Hello, {user.username}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        ) : (
          <div className="header-nav">
            <Link to="/login">
              <button className="btn-secondary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-primary">Signup</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;