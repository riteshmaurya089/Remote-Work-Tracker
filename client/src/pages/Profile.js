import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import AuthContext from '../context/authContext';
import api from '../services/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    currentPassword: Yup.string(),
    newPassword: Yup.string().when('currentPassword', {
      is: (val) => val && val.length > 0,
      then: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setSuccess(false);
        
        const updateData = {
          name: values.name,
          email: values.email,
        };

        if (values.currentPassword && values.newPassword) {
          updateData.currentPassword = values.currentPassword;
          updateData.newPassword = values.newPassword;
        }

        await api.put('/users/' + user._id, updateData);
        await loadUser();
        setSuccess(true);
        formik.resetForm({
          values: {
            ...formik.values,
            currentPassword: '',
            newPassword: '',
          },
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <TextField
            margin="normal"
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;