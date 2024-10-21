import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JoinMeeting = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.user)
  
  const [roomName, setRoomName] = useState(''); // State for room name

  const handleJoinRoom = () => {

    if (roomName.trim() === '') {
      toast.error('Please enter a valid room name.');
      return;
    }

    if(!user){
      toast.error('Please login.');
      return;
    }
    // Open Jitsi meeting in a new tab (using the room name)
    const jitsiUrl = `https://meet.jit.si/${roomName}`;
    window.open(jitsiUrl, '_blank');

    // Send the userId and meeting name to the server (Future work)
    // Fetch the user details using the stored userId (server-side logic)
    // Example: save meeting details to the database via API request

    // navigate("/meetings"); // Optionally navigate somewhere in the app
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
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
        >
          Join Room
        </button>
      </div>
    </section>
  );
};

export default JoinMeeting;
