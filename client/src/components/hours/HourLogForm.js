import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  
  const HourLogForm = ({ open, handleClose, onSubmit, currentLog }) => {
    const validationSchema = Yup.object({
      date: Yup.date().required('Date is required'),
      hours: Yup.number()
        .required('Hours is required')
        .min(0.5, 'Minimum 0.5 hours')
        .max(24, 'Maximum 24 hours'),
      description: Yup.string().required('Description is required'),
    });
  
    const formik = useFormik({
      initialValues: {
        date: currentLog?.date || null,
        hours: currentLog?.hours || '',
        description: currentLog?.description || '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentLog ? 'Edit Hour Log' : 'Add New Hour Log'}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DatePicker
              label="Date"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue('date', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                />
              )}
            />
            <TextField
              margin="normal"
              fullWidth
              id="hours"
              name="hours"
              label="Hours Worked"
              type="number"
              inputProps={{ step: "0.5", min: "0.5", max: "24" }}
              value={formik.values.hours}
              onChange={formik.handleChange}
              error={formik.touched.hours && Boolean(formik.errors.hours)}
              helperText={formik.touched.hours && formik.errors.hours}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {currentLog ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  
  export default HourLogForm;