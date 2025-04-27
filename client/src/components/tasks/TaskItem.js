import {
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Box,
    Stack,
  } from '@mui/material';
  import { Edit, Delete } from '@mui/icons-material';
  import { format } from 'date-fns';
  
  const TaskItem = ({ task, onEdit, onDelete }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed':
          return 'success';
        case 'in-progress':
          return 'warning';
        default:
          return 'default';
      }
    };
  
    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high':
          return 'error';
        case 'medium':
          return 'warning';
        default:
          return 'success';
      }
    };
  
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">{task.title}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                size="small"
              />
              <Chip
                label={task.priority}
                color={getPriorityColor(task.priority)}
                size="small"
              />
            </Stack>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="caption">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </Typography>
            <Box>
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={() => onEdit(task)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<Delete />}
                color="error"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default TaskItem;