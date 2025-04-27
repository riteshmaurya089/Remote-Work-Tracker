import { useContext } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Schedule as HoursIcon,
  Report as ReportIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const drawerWidth = 240;

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/tasks">
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button component={Link} to="/hours">
            <ListItemIcon>
              <HoursIcon />
            </ListItemIcon>
            <ListItemText primary="Hours" />
          </ListItem>
          <ListItem button component={Link} to="/reports">
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;