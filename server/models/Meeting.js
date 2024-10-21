const mongoose = require('mongoose');


// Define the Meeting schema
const meetingSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true, // Ensure room names are unique
    trim: true
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  createdAt: {
    type: Date,
    required:true
  }
});

// Create the Meeting model
const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
