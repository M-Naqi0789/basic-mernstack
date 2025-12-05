import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const getInitialToken = () => {
  if (initialAuthToken) {
    return initialAuthToken;
  }
  return localStorage.getItem('token');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getInitialToken());
  const [isAuthenticated, setIsAuthenticated] = useState(!!getInitialToken());
  const [loading, setLoading] = useState(true);

  const login = (userData, jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (token && !user) {
      setUser({ name: "Guest User", email: "guest@tracker.com" });
    }
    setLoading(false);
  }, [token, user]);

  const contextValue = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
            Checking authentication...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth };