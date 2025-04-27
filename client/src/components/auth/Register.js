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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });
  const { name, email, password, role } = formData;
  const { register, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            fullWidth
            margin="normal"
          />
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={role}
              label="Role"
              onChange={onChange}
              required
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Typography align="center">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;