import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import HourLogItem from '../components/hours/HourLogItem';
import HourLogForm from '../components/hours/HourLogForm';
import AuthContext from '../context/authContext';
import api from '../services/api';
import { DatePicker } from '@mui/x-date-pickers';
import { format, subDays } from 'date-fns';

const Hours = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/hours/range', {
          params: {
            startDate: format(dateRange.startDate, 'yyyy-MM-dd'),
            endDate: format(dateRange.endDate, 'yyyy-MM-dd'),
          },
        });
        setLogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [dateRange]);

  const handleOpen = (log = null) => {
    setCurrentLog(log);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentLog(null);
  };

  const handleSubmit = async (logData) => {
    try {
      if (currentLog) {
        // Update log
        const res = await api.put(`/hours/${currentLog._id}`, logData);
        setLogs(logs.map(log => log._id === currentLog._id ? res.data : log));
      } else {
        // Create log
        const res = await api.post('/hours', logData);
        setLogs([...logs, res.data]);
      }
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/hours/${id}`);
      setLogs(logs.filter(log => log._id !== id));
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
        <Typography variant="h4">Hour Logs</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Log
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={3}>
        <DatePicker
          label="Start Date"
          value={dateRange.startDate}
          onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={dateRange.endDate}
          onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>

      {logs.length === 0 ? (
        <Typography>No hour logs found for selected period.</Typography>
      ) : (
        logs.map((log) => (
          <HourLogItem
            key={log._id}
            log={log}
            onEdit={handleOpen}
            onDelete={handleDelete}
          />
        ))
      )}

      <HourLogForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        currentLog={currentLog}
      />
    </Box>
  );
};

export default Hours;