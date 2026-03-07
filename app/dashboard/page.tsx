import { Box, Typography, Paper, Grid } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Welcome back, Admin!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This is your admin dashboard where you can manage your blog content.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              Recent Activity
            </Typography>
            <Typography component="p" variant="h4">
              --
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              on 15 March, 2024
            </Typography>
          </Paper>
        </Grid>
        {/* Add more dashboard widgets here */}
      </Grid>
    </Box>
  );
}
