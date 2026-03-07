'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { getProfile } from '@/lib/api';

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return <Typography>Failed to load profile.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ p: 4, mt: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          My Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={profile.avatar}
              alt={profile.username}
              sx={{ width: 80, height: 80 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{`${profile.firstName} ${profile.lastName}`}</Typography>
            <Typography color="text.secondary">@{profile.username}</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1" gutterBottom>
            {profile.email}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Bio
          </Typography>
          <Typography variant="body1">
            {profile.bio || 'No bio provided.'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
