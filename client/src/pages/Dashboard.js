import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AuthContext from '../context/authContext';
import api from '../services/api';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hoursRes, tasksRes, reportsRes] = await Promise.all([
          api.get('/hours/range', {
            params: {
              startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
              endDate: format(new Date(), 'yyyy-MM-dd'),
            },
          }),
          api.get('/tasks'),
          api.get('/reports'),
        ]);

        setStats({
          hours: hoursRes.data,
          tasks: tasksRes.data,
          reports: reportsRes.data,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const hoursData = stats?.hours.map((log) => ({
    date: format(new Date(log.date), 'MMM dd'),
    hours: log.hours,
  }));

  const taskStatusCount = stats?.tasks.reduce(
    (acc, task) => {
      acc[task.status]++;
      return acc;
    },
    { pending: 0, 'in-progress': 0, completed: 0 }
  );

  const tasksData = [
    { name: 'Pending', value: taskStatusCount?.pending || 0 },
    { name: 'In Progress', value: taskStatusCount?.['in-progress'] || 0 },
    { name: 'Completed', value: taskStatusCount?.completed || 0 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Hours Worked (Last 30 Days)
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Task Status
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Typography>
              Total Hours: {stats?.hours.reduce((acc, log) => acc + log.hours, 0)}
            </Typography>
            <Typography>
              Pending Tasks: {taskStatusCount?.pending}
            </Typography>
            <Typography>
              In Progress Tasks: {taskStatusCount?.['in-progress']}
            </Typography>
            <Typography>
              Completed Tasks: {taskStatusCount?.completed}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Reports
            </Typography>
            {stats?.reports.slice(0, 3).map((report) => (
              <Box key={report._id} mb={1}>
                <Typography>
                  {report.title} - {report.status}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;