import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
  } from '@mui/material';
  import { Edit, Delete } from '@mui/icons-material';
  import { format } from 'date-fns';
  
  const ReportItem = ({ report, onEdit, onDelete, onSubmit }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'submitted':
          return 'primary';
        case 'approved':
          return 'success';
        case 'rejected':
          return 'error';
        default:
          return 'default';
      }
    };
  
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{report.title}</Typography>
            <Chip
              label={report.status}
              color={getStatusColor(report.status)}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {report.submittedAt ? format(new Date(report.submittedAt), 'MMM dd, yyyy') : 'Draft'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
            {report.content}
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {report.status === 'draft' && (
              <>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => onEdit(report)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => onDelete(report._id)}
                  sx={{ mr: 1 }}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => onSubmit(report._id)}
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  export default ReportItem;