import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Sign up route - sends verification email
app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, // Store username in user metadata
      }
    }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Check if user needs to verify email
  if (data.user && !data.user.email_confirmed_at) {
    return res.status(200).json({ 
      message: 'Sign up successful! Please check your email to verify your account.',
      needsVerification: true 
    });
  }

  return res.status(200).json({ 
    message: 'User created successfully!',
    needsVerification: false 
  });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Check if email is verified
  if (!data.user.email_confirmed_at) {
    return res.status(401).json({ 
      error: 'Please verify your email before logging in.',
      needsVerification: true 
    });
  }

  return res.status(200).json({ 
    message: 'Login successful!',
    user: data.user,
    session: data.session 
  });
});

// Resend verification email
app.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Verification email sent!' });
});

// Handle email verification callback
app.get('/verify-email', async (req, res) => {
  const { token_hash, type } = req.query;

  if (type === 'email' && token_hash) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'email'
    });

    if (error) {
      return res.status(400).json({ error: 'Invalid verification link' });
    }

    return res.status(200).json({ message: 'Email verified successfully!' });
  }

  return res.status(400).json({ error: 'Invalid verification request' });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});