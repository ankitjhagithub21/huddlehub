import React from 'react';

const RoomForm = ({ roomName, setRoomName, userName, setUserName, handleJoinRoom }) => {
  return (
    <div className="flex flex-col items-center rounded-xl p-8 space-y-6 border">
      <img src="./logo.png" alt="logo" className='bg-white rounded-lg' width={150}/>
      <h1 className="text-2xl  mt-2">Join a Meeting Room</h1>
      <p className="text-center">
        Enter the **Room Name** and **Your Name** to start or join an existing meeting.
      </p>

      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="w-72 px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <input
        type="text"
        placeholder="Enter Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-72 px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        onClick={handleJoinRoom}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
      >
        Join Room
      </button>
    </div>
  );
};

export default RoomForm;
