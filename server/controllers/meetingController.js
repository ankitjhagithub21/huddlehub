const Meeting = require('../models/Meeting'); // Import the Meeting model

// Create a new meeting
const createMeeting = async (req, res) => {
  try {
    const { roomName, attendees } = req.body; // Extract data from request body
    const createdBy = req.user._id; // Assuming user ID is set in req.user after authentication

    const newMeeting = new Meeting({
      roomName,
      attendees,
      createdBy,
    });

    await newMeeting.save(); 
    res.status(201).json({ message: 'Meeting created successfully', meeting: newMeeting });
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

// Get all meetings created by the user
const getUserMeetings = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from request
    const meetings = await Meeting.find({ createdBy: userId }).populate('attendees', 'firstName'); // Populate attendees' names
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error: error.message });
  }
};

// Get a specific meeting by room name
const getMeetingByRoomName = async (req, res) => {
  try {
    const { roomName } = req.params;
    const meeting = await Meeting.findOne({ roomName }).populate('attendees', 'firstName');
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createMeeting,
  getUserMeetings,
  getMeetingByRoomName,
};
