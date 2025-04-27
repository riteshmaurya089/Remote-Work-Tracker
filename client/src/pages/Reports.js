import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import ReportItem from '../components/reports/ReportItem';
import ReportForm from '../components/reports/ReportForm';
import AuthContext from '../context/authContext';
import api from '../services/api';

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [tabValue, setTabValue] = useState('all');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/reports');
        setReports(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleOpen = (report = null) => {
    setCurrentReport(report);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentReport(null);
  };

  const handleSubmit = async (reportData) => {
    try {
      if (currentReport) {
        // Update report
        const res = await api.put(`/reports/${currentReport._id}`, reportData);
        setReports(reports.map(report => report._id === currentReport._id ? res.data : report));
      } else {
        // Create report
        const res = await api.post('/reports', reportData);
        setReports([...reports, res.data]);
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reports/${id}`);
      setReports(reports.filter(report => report._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReport = async (id) => {
    try {
      const res = await api.put(`/reports/${id}/submit`);
      setReports(reports.map(report => report._id === id ? res.data : report));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReports = reports.filter(report => {
    if (tabValue === 'all') return true;
    if (tabValue === 'drafts') return report.status === 'draft';
    return report.status === tabValue;
  });

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
        <Typography variant="h4">Reports</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          New Report
        </Button>
      </Stack>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Drafts" value="drafts" />
        <Tab label="Submitted" value="submitted" />
        <Tab label="Approved" value="approved" />
        <Tab label="Rejected" value="rejected" />
      </Tabs>

      {filteredReports.length === 0 ? (
        <Typography>No reports found.</Typography>
      ) : (
        filteredReports.map((report) => (
          <ReportItem
            key={report._id}
            report={report}
            onEdit={handleOpen}
            onDelete={handleDelete}
            onSubmit={handleSubmitReport}
          />
        ))
      )}

      <ReportForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        currentReport={currentReport}
      />
    </Box>
  );
};

export default Reports;