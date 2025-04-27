import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
  } from '@mui/material';
  import { Edit, Delete } from '@mui/icons-material';
  import { format } from 'date-fns';
  
  const HourLogItem = ({ log, onEdit, onDelete }) => {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {format(new Date(log.date), 'MMM dd, yyyy')}
            </Typography>
            <Typography variant="h6">{log.hours} hours</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {log.description}
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={() => onEdit(log)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              size="small"
              startIcon={<Delete />}
              color="error"
              onClick={() => onDelete(log._id)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default HourLogItem;