const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    status: 'active',
    time: new Date().toISOString()
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  if (email === 'test@example.com' && password === 'password123') {
    res.json({ 
      success: true, 
      user: { 
        id: 1,
        name: 'Test User', 
        email: email,
        avatar: 'https://ui-avatars.com/api/?name=Test+User'
      } 
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
  console.log('Signup attempt:', email);
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  res.json({ 
    success: true, 
    token: 'dummy-token',
    user: { 
      id: Date.now(),
      name, 
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    } 
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Netflix Clone API',
    version: '1.0.0',
    author: 'Surendar',
    endpoints: ['/api/test', '/api/auth/login', '/api/auth/register']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});