'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAPI, getCategories, getPost, updatePost } from '@/lib/api';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const [cats, post] = await Promise.all([
          getCategories(),
          getPost(id as string),
        ]);
        
        setCategories(cats);
        
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          setSlug(post.slug);
          setPublished(post.published);
          setCategoryId(post.categoryId);
        } else {
          setError('Post not found');
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to load post data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      init();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Please select a category');
      return;
    }
    try {
      await updatePost(id as string, {
        title,
        content,
        slug,
        published,
        categoryId: Number(categoryId),
      });
      router.push('/dashboard/posts');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update post');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
          Edit Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            helperText="URL-friendly version of the title"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={categoryId}
              label="Category"
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                color="primary"
              />
            }
            label="Published"
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Post
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
