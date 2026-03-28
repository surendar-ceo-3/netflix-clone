const express = require('express');
const app = express();

app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', status: 'active' });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'test@example.com' && password === 'password123') {
    res.json({ 
      success: true, 
      user: { id: 1, name: 'Test User', email } 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// Signup endpoint
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  res.json({ 
    success: true, 
    token: 'dummy-token',
    user: { id: Date.now(), name, email } 
  });
});

// Export for Vercel serverless
module.exports = app;