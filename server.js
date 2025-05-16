const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://shahdahmedfci9191:XFxfxfxf99900@cluster0.yjvqaxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Connected Successfully');
    
    // Create default admin user if it doesn't exist
    const User = require('./models/User');
    try {
      const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
      
      if (!existingAdmin) {
        console.log('Creating default admin user...');
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const adminUser = new User({
          username: 'admin',
          email: 'admin@admin.com',
          password: hashedPassword,
          role: 'admin'
        });
        
        await adminUser.save();
        console.log('Default admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (err) {
      console.error('Error with admin user:', err);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import routes
console.log('Importing routes...');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const bookingsRoutes = require('./routes/bookings');

// Register routes
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingsRoutes);

// Test route to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message,
    path: req.path
  });
});

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, {
  reuseAddr: true,
  keepAlive: true
}, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- /api/auth/*');
  console.log('- /api/admin/*');
  console.log('- /api/contact/*');
  console.log('- /api/bookings/*');
  console.log('- /api/test');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, retrying in 5 seconds...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT, {
        reuseAddr: true,
        keepAlive: true
      });
    }, 5000);
  } else {
    console.error('Server error:', error);
  }
});