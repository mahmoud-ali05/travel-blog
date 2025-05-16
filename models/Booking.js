const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourTitle: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  tickets: {
    adult: {
      type: Number,
      required: true,
      default: 1
    },
    children: {
      type: Number,
      required: true,
      default: 0
    },
    infant: {
      type: Number,
      required: true,
      default: 0
    }
  },
  customerInfo: {
    title: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    guideId: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema); 