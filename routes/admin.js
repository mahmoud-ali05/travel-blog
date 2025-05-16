const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const User = require('../models/User');
const Country = require('../models/Country');
const mongoose = require('mongoose');

// Get all users
router.get('/users', admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update user status (disable/enable)
router.put('/users/:id/status', admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete user
router.delete('/users/:id', admin, async (req, res) => {
  try {
    console.log('Delete user request received:', {
      userId: req.params.id,
      adminId: req.user._id
    });

    // Validate user ID
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid user ID format:', req.params.id);
      return res.status(400).json({ 
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const user = await User.findById(req.params.id);
    console.log('Found user:', user ? {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    } : 'User not found');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Cannot delete admin users'
      });
    }

    const result = await User.deleteOne({ _id: req.params.id });
    console.log('Delete result:', result);

    if (result.deletedCount === 0) {
      console.log('No user was deleted');
      return res.status(500).json({ 
        success: false,
        message: 'Failed to delete user'
      });
    }
    
    res.json({ 
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('Error in delete user:', {
      error: err.message,
      stack: err.stack,
      userId: req.params.id
    });
    res.status(500).json({ 
      success: false,
      message: 'Error deleting user',
      error: err.message
    });
  }
});

// Get all countries
router.get('/countries', admin, async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new country
router.post('/countries', admin, async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    const country = new Country({
      name,
      description,
      imageUrl
    });
    
    await country.save();
    res.json(country);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update country
router.put('/countries/:id', admin, async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    country.name = name || country.name;
    country.description = description || country.description;
    country.imageUrl = imageUrl || country.imageUrl;
    
    await country.save();
    res.json(country);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete country
router.delete('/countries/:id', admin, async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    await Country.deleteOne({ _id: country._id });
    res.json({ message: 'Country removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 