const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      user = new User({
        username,
        email,
        password
      });

      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign token
      jwt.sign(
        payload,
        'your-super-secret-jwt-key-2024',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    try {
      console.log('Login request received:', req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      console.log('Attempting login for email:', email);

      // Check if user exists
      let user = await User.findOne({ email });
      console.log('User found:', user ? {
        id: user._id,
        email: user.email,
        role: user.role
      } : 'No user found');
      
      if (!user) {
        console.log('User not found:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('User found, comparing password...');
      // Check password
      const isMatch = await user.comparePassword(password);
      console.log('Password match result:', isMatch);
      
      if (!isMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('Password matched, creating token...');
      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign token
      jwt.sign(
        payload,
        'your-super-secret-jwt-key-2024',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error('Error signing token:', err);
            throw err;
          }
          console.log('Login successful for user:', {
            id: user._id,
            email: user.email,
            role: user.role
          });
          res.json({ 
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        }
      );
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, 'your-super-secret-jwt-key-2024');
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// @route   POST api/auth/create-admin
// @desc    Create admin user
// @access  Public
router.post(
  '/create-admin',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new admin user
      user = new User({
        username,
        email,
        password,
        role: 'admin'  // Set role as admin
      });

      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign token
      jwt.sign(
        payload,
        'your-super-secret-jwt-key-2024',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/auth/delete-all-users
// @desc    Delete all users from database
// @access  Public
router.delete('/delete-all-users', async (req, res) => {
  try {
    console.log('Attempting to delete all users...');
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
    res.json({ message: `Successfully deleted ${result.deletedCount} users` });
  } catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).json({ message: 'Error deleting users' });
  }
});

// @route   GET api/auth/check-admin
// @desc    Check if admin user exists
// @access  Public
router.get('/check-admin', async (req, res) => {
  try {
    const admin = await User.findOne({ email: 'admin@admin.com' });
    if (admin) {
      console.log('Admin user exists:', {
        id: admin._id,
        email: admin.email,
        role: admin.role
      });
      res.json({ exists: true, admin: { email: admin.email, role: admin.role } });
    } else {
      console.log('Admin user does not exist');
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking admin:', err);
    res.status(500).json({ message: 'Error checking admin user' });
  }
});

// @route   POST api/auth/reset-admin
// @desc    Reset and create admin user
// @access  Public
router.post('/reset-admin', async (req, res) => {
  try {
    // Delete all existing users
    await User.deleteMany({});
    console.log('All users deleted');

    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    res.json({ message: 'Admin user reset successfully' });
  } catch (err) {
    console.error('Error resetting admin:', err);
    res.status(500).json({ message: 'Error resetting admin user' });
  }
});

// @route   POST api/auth/ensure-admin
// @desc    Ensure admin user exists, create if not
// @access  Public
router.post('/ensure-admin', async (req, res) => {
  try {
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@admin.com' });
    
    if (!admin) {
      console.log('Admin user not found, creating new admin...');
      // Create new admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      admin = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log('Admin user created successfully');
      res.json({ message: 'Admin user created successfully' });
    } else {
      console.log('Admin user already exists');
      res.json({ message: 'Admin user already exists' });
    }
  } catch (err) {
    console.error('Error ensuring admin:', err);
    res.status(500).json({ message: 'Error ensuring admin user' });
  }
});

// @route   GET api/auth/admin-status
// @desc    Check admin user status
// @access  Public
router.get('/admin-status', async (req, res) => {
  try {
    const admin = await User.findOne({ email: 'admin@admin.com' });
    if (admin) {
      console.log('Admin user found:', {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      });
      res.json({
        exists: true,
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive
        }
      });
    } else {
      console.log('Admin user not found');
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking admin status:', err);
    res.status(500).json({ message: 'Error checking admin status' });
  }
});

// @route   GET api/auth/check-admin-credentials
// @desc    Check and display admin credentials
// @access  Public
router.get('/check-admin-credentials', async (req, res) => {
  try {
    const admin = await User.findOne({ email: 'admin@admin.com' });
    if (admin) {
      res.json({
        message: 'Admin account exists',
        credentials: {
          email: 'admin@admin.com',
          password: 'admin123',
          role: admin.role
        }
      });
    } else {
      // Create admin if not exists
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const newAdmin = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin'
      });

      await newAdmin.save();
      res.json({
        message: 'Admin account created',
        credentials: {
          email: 'admin@admin.com',
          password: 'admin123',
          role: 'admin'
        }
      });
    }
  } catch (err) {
    console.error('Error checking admin credentials:', err);
    res.status(500).json({ message: 'Error checking admin credentials' });
  }
});

// @route   POST api/auth/reset-admin-password
// @desc    Reset admin password
// @access  Public
router.post('/reset-admin-password', async (req, res) => {
  try {
    // Find admin user
    let admin = await User.findOne({ email: 'admin@admin.com' });
    
    if (!admin) {
      // Create new admin if doesn't exist
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      admin = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin'
      });
    } else {
      // Update existing admin password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash('admin123', salt);
    }

    await admin.save();
    console.log('Admin password reset successfully');
    
    res.json({ 
      message: 'Admin password reset successfully',
      credentials: {
        email: 'admin@admin.com',
        password: 'admin123'
      }
    });
  } catch (err) {
    console.error('Error resetting admin password:', err);
    res.status(500).json({ message: 'Error resetting admin password' });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 