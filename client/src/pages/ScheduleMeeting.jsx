import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAttendees } from '../api/user';
import { toast } from 'react-toastify';
import { createMeeting } from '../api/meeting';

const ScheduleMeeting = () => {
    const { token, user } = useSelector((state) => state.user);
    const [roomName, setRoomName] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAttendees, setSelectedAttendees] = useState([]);
    const [meetingLink, setMeetingLink] = useState('');
    const navigate = useNavigate(); 

    const handleSchedule = async () => {
        if (roomName.trim() === '' || meetingTime === '') {
            toast.error('Please fill all the fields.');
            return;
        }
        if (new Date(meetingTime) < new Date()) {
            toast.error('Meeting time cannot be in the past.');
            return;
        }
        if (!user) {
            toast.error('Please login.');
            return;
        }

        const meetingData = {
            roomName,
            meetingTime,
            createdAt: new Date().toISOString(), // Store current time as creation time
            attendees: selectedAttendees
        };

        try {
            setIsLoading(true);
            const res = await createMeeting(meetingData, token);
            const data = await res.json();
            if (res.ok) {
                toast.success('Meeting scheduled successfully!');
                setRoomName('');
                setMeetingTime('');
                setSelectedAttendees([]);
                setMeetingLink(`https://huddle-hub.vercel.app/meetings/${data.meeting.roomName}`);
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to schedule meeting.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return; // Early return if no token

            try {
                const res = await getAttendees(token);
                if (!res.ok) throw new Error('Failed to fetch attendees');
                const data = await res.json();
                setAttendees(data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch attendees.');
            }
        };
        fetchUsers();
    }, [token]);

    const handleAttendeeChange = (e) => {
        const { value, checked } = e.target;
        setSelectedAttendees((prev) =>
            checked ? [...prev, value] : prev.filter((attendeeId) => attendeeId !== value)
        );
    };

    const copyMeetingLink = () => {
        navigator.clipboard.writeText(meetingLink)
            .then(() => {
                toast.success('Meeting link copied to clipboard!');
                setMeetingLink('');
            })
            .catch((err) => {
                toast.error('Failed to copy meeting link.');
                console.error('Error copying text: ', err);
            });
    };

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return (
        <section className='min-h-screen w-full flex items-center justify-center px-5 py-24'>
            <div className="flex flex-col items-center rounded-xl p-6 space-y-6 border w-full max-w-md">

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

                {/* Select attendees with checkboxes */}
                {attendees.length > 0 && (
                    <>
                        <h2>Select attendees</h2>
                        <div className="w-72 border border-gray-300 rounded-lg p-2 max-h-32 overflow-y-auto">
                            {attendees.map((attendee) => (
                                <div key={attendee._id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={attendee._id}
                                        value={attendee._id}
                                        checked={selectedAttendees.includes(attendee._id)}
                                        onChange={handleAttendeeChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={attendee._id}>{attendee.name}</label>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Button to schedule the meeting */}
                <button
                    onClick={handleSchedule}
                    disabled={isLoading}
                    className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Scheduling...' : 'Schedule Meeting'}
                </button>

                {/* Button to copy meeting link */}
                {meetingLink && (
                    <button 
                        onClick={copyMeetingLink} 
                        className='bg-green-500 text-white rounded-lg px-4 py-2'
                    >
                        Copy meeting link
                    </button>
                )}
            </div>
        </section>
    );
};

export default ScheduleMeeting;  
