import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleMeeting = () => {
    const [roomName, setRoomName] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [attendees, setAttendees] = useState([]); // Will fetch from server later
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleSchedule = () => {
        if (roomName.trim() === '' || meetingTime === '') {
            alert('Please provide both room name and meeting time.');
            return;
        }
        // Log roomName and meetingTime (or handle meeting scheduling logic here)
        console.log('Room Name:', roomName);
        console.log('Meeting Time:', meetingTime);
        console.log('Selected Attendees:', attendees);
        
        // Add scheduling logic here (e.g., call an API to save meeting details)
    };

    return (
        <section className='min-h-screen w-full flex items-center justify-center px-5'>
            <div className="flex flex-col items-center rounded-xl p-8 space-y-6 border w-full max-w-md">

                <img 
                    src="./logo.png" 
                    onClick={() => navigate("/")} 
                    alt="logo" 
                    className='bg-white cursor-pointer hover:scale-105 rounded-lg' 
                    width={150} 
                />

                <h1 className="text-2xl mt-2">Schedule a Meeting</h1>

                {/* Input for room name */}
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-72 px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* Input for meeting time */}
                <input
                    type="datetime-local"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-72 px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* Button to schedule the meeting */}
                <button
                    onClick={handleSchedule}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                    Schedule Meeting
                </button>
            </div>
        </section>
    );
};

export default ScheduleMeeting;
