import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      logout();
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser();
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser();
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  };

  // Clear errors
  const clearErrors = () => setError(null);

  // Set token on initial load
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      loadUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        error,
        loading,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;