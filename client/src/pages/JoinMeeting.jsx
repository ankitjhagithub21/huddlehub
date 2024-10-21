import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMeeting } from '../api/meeting';

const JoinMeeting = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [roomName, setRoomName] = useState(''); 

  const handleJoinRoom = async () => {
    if (roomName.trim() === '') {
      toast.error('Please enter a valid room name.');
      return;
    }

    if (!user) {
      toast.error('Please login to join a meeting.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await getMeeting(roomName, token); // Use roomName here
      if (res.ok) {
        const data = await res.json(); // Extract the data from the response

        // Pass the attendees data along with roomName to the Meeting component
        navigate(`/meetings/${data.roomName}`, { state: { attendees: data.attendees } });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to join meeting.');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='min-h-screen w-full flex items-center justify-center px-5'>
      <div className="flex flex-col items-center rounded-xl p-8 space-y-6 border w-full max-w-md">
        <img src="./logo.png" onClick={() => navigate("/")} alt="logo" className='bg-white cursor-pointer hover:scale-105 rounded-lg' width={150} />

        <h1 className="text-2xl mt-2">Join a Meeting Room</h1>
        <p className="text-center">
          Enter the <b>Room Name</b> to join a meeting.
        </p>

        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-72 px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleJoinRoom}
          disabled={isLoading} // Disable the button while loading
          className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Joining...' : 'Join Room'}
        </button>
      </div>
    </section>
  );
};

export default JoinMeeting;
