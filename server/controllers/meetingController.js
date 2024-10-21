const Meeting = require('../models/Meeting'); // Import the Meeting model

// Create a new meeting
const createMeeting = async (req, res) => {
  try {
    const { roomName, attendees,createdAt } = req.body; 
    const createdBy = req.user._id; 

    const meeting = await Meeting.findOne({roomName})

    if(meeting){
      return res.status(400).json({ message: 'Meeting already created.'});
    }

    const newMeeting = new Meeting({
      roomName,
      attendees,
      createdBy,
      createdAt
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
    const userId = req.user._id; 

    const meeting = await Meeting.findOne({ roomName }).populate('attendees', 'name'); 
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if the user is an attendee or the creator
    const isAttendee = meeting.attendees.some(attendee => attendee._id.toString() === userId.toString());
    const isCreator = meeting.createdBy.toString() === userId.toString();

    if (!isAttendee && !isCreator) {
      return res.status(403).json({ message: 'Access denied: You are not allowed to join this meeting' });
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
