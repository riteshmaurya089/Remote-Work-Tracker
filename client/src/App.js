import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/ui/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Hours from './pages/Hours';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Alert from './components/ui/Alert';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Header />
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                marginTop: '64px',
                backgroundColor: '#f5f5f5',
                minHeight: 'calc(100vh - 64px)',
              }}
            >
              <Alert />
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
                <Route path="/hours" element={<PrivateRoute><Hours /></PrivateRoute>} />
                <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;