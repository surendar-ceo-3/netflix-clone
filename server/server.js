const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'test@example.com' && password === 'password123') {
    res.json({ 
      success: true, 
      token: 'fake-jwt-token',
      user: { name: 'Test User', email, id: 1 } 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
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
  
  // Check if user exists (simple check)
  if (email === 'test@example.com') {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
  };
  
  res.json({
    success: true,
    token: 'fake-jwt-token',
    user: newUser
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});