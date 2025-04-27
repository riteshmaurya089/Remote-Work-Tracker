import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  
  const TaskForm = ({ open, handleClose, onSubmit, currentTask }) => {
    const validationSchema = Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      dueDate: Yup.date().required('Due date is required'),
      status: Yup.string().required('Status is required'),
      priority: Yup.string().required('Priority is required'),
    });
  
    const formik = useFormik({
      initialValues: {
        title: currentTask?.title || '',
        description: currentTask?.description || '',
        dueDate: currentTask?.dueDate || null,
        status: currentTask?.status || 'pending',
        priority: currentTask?.priority || 'medium',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentTask ? 'Edit Task' : 'Create New Task'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <DatePicker
              label="Due Date"
              value={formik.values.dueDate}
              onChange={(value) => formik.setFieldValue('dueDate', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
              )}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                id="status"
                name="status"
                value={formik.values.status}
                label="Status"
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                id="priority"
                name="priority"
                value={formik.values.priority}
                label="Priority"
                onChange={formik.handleChange}
                error={formik.touched.priority && Boolean(formik.errors.priority)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {currentTask ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default TaskForm;