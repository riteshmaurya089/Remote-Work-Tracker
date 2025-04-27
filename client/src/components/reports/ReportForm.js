import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from '@mui/material';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  
  const ReportForm = ({ open, handleClose, onSubmit, currentReport }) => {
    const validationSchema = Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    });
  
    const formik = useFormik({
      initialValues: {
        title: currentReport?.title || '',
        content: currentReport?.content || '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {currentReport ? 'Edit Report' : 'Create New Report'}
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
              id="content"
              name="content"
              label="Content"
              multiline
              rows={10}
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {currentReport?.status === 'draft' && (
              <Button type="submit" color="primary">
                {currentReport ? 'Update' : 'Create'}
              </Button>
            )}
            {currentReport?.status === 'draft' && (
              <Button type="button" color="success" onClick={() => onSubmit({ ...formik.values, status: 'submitted' })}>
                Submit
              </Button>
            )}
            {!currentReport && (
              <Button type="submit" color="primary">
                Create
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default ReportForm;