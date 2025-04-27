import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Link,
  CircularProgress,
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const { login, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            fullWidth
            margin="normal"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Typography align="center">
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;