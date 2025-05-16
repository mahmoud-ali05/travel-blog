const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/protected
// @desc    Test protected route
// @access  Private
router.get('/', auth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router; 