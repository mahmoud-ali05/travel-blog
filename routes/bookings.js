const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    
    res.status(201).json({ 
      success: true, 
      data: booking,
      message: 'تم إنشاء الحجز بنجاح'
    });
  } catch (error) {
    console.error('خطأ في إنشاء الحجز:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @route   PUT api/bookings/:id
// @desc    Update booking status
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router; 