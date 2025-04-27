import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Remote Work Tracker
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;