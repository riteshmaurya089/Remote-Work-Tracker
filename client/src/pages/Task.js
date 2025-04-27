import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import TaskItem from '../components/tasks/TaskItem';
import TaskForm from '../components/tasks/TaskForm';
import AuthContext from '../context/authContext';
import api from '../services/api';

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleOpen = (task = null) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(null);
  };

  const handleSubmit = async (taskData) => {
    try {
      if (currentTask) {
        // Update task
        const res = await api.put(`/tasks/${currentTask._id}`, taskData);
        setTasks(tasks.map(task => task._id === currentTask._id ? res.data : task));
      } else {
        // Create task
        const res = await api.post('/tasks', taskData);
        setTasks([...tasks, res.data]);
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Task
        </Button>
      </Stack>

      {tasks.length === 0 ? (
        <Typography>No tasks found. Create your first task!</Typography>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleOpen}
            onDelete={handleDelete}
          />
        ))
      )}

      <TaskForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        currentTask={currentTask}
      />
    </Box>
  );
};

export default Tasks;