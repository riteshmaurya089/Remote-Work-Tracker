import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

const Alert = () => {
  const { error, clearErrors } = useContext(AuthContext);

  return (
    <Snackbar
      open={Boolean(error)}
      autoHideDuration={6000}
      onClose={clearErrors}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        onClose={clearErrors}
        severity="error"
        elevation={6}
        variant="filled"
      >
        {error}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;