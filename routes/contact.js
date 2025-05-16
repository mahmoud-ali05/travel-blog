const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Contact = require('../models/Contact');
const User = require('../models/User');

// @route   POST api/contact
// @desc    Send a message to admin
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received contact message:', req.body);
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Subject and message are required' 
      });
    }

    const contact = new Contact({
      user: req.user.id,
      subject,
      message
    });

    await contact.save();
    console.log('Message saved successfully:', contact);

    res.json({
      success: true,
      message: 'Message sent successfully',
      contact
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET api/contact
// @desc    Get all messages for admin
// @access  Private (Admin only)
router.get('/', admin, async (req, res) => {
  try {
    console.log('Fetching all messages for admin');
    const messages = await Contact.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    console.log(`Found ${messages.length} messages`);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET api/contact/user
// @desc    Get user's messages
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    console.log('Fetching messages for user:', req.user.id);
    const messages = await Contact.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    console.log(`Found ${messages.length} messages for user`);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching user messages:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT api/contact/:id/respond
// @desc    Admin responds to a message
// @access  Private (Admin only)
router.put('/:id/respond', admin, async (req, res) => {
  try {
    console.log('Admin responding to message:', req.params.id);
    const { response } = req.body;

    if (!response) {
      return res.status(400).json({ 
        success: false, 
        message: 'Response is required' 
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    contact.adminResponse = response;
    contact.status = 'responded';
    contact.respondedAt = Date.now();

    await contact.save();
    console.log('Response saved successfully');

    res.json({
      success: true,
      message: 'Response sent successfully',
      contact
    });
  } catch (err) {
    console.error('Error responding to message:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router; 