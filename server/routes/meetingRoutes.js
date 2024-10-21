const express = require('express');
const meetingRouter = express.Router();
const {
  createMeeting,
  getUserMeetings,
  getMeetingByRoomName,
} = require('../controllers/meetingController');
const { protect } = require('../middlewares/authMiddleware'); // Middleware to authenticate user

// Route to create a new meeting
meetingRouter.post('/', protect, createMeeting);

// Route to get all meetings created by the authenticated user
meetingRouter.get('/', protect, getUserMeetings);

// Route to get a specific meeting by room name
meetingRouter.get('/:roomName', protect, getMeetingByRoomName);

// Export the router
module.exports = meetingRouter;
