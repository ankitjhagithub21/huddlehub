import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState, useRef } from 'react';
import Loader from '../components/Loader';
import RoomForm from '../components/RoomForm'; // Import RoomForm component

const Meeting = () => {
  const YOUR_DOMAIN = 'meet.jit.si'; // Public Jitsi instance or custom server
  const [roomName, setRoomName] = useState(''); // Room name input state
  const [isMeetingReady, setIsMeetingReady] = useState(false); // Toggle meeting visibility
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [userName, setUserName] = useState(''); // User name input state
  const externalApiRef = useRef(null); // Ref for Jitsi API instance

  const handleJoinRoom = () => {
    if (roomName.trim() === '') {
      alert('Please enter a valid room name');
      return;
    }
    if (userName.trim() === '') {
      alert('Please enter a valid user name');
      return;
    }
    setIsMeetingReady(true);
    setIsLoading(true); // Show loader before meeting loads
  };

  const handleExitRoom = () => {
    if (externalApiRef.current) {
      externalApiRef.current.executeCommand('hangup'); // Hangup the meeting
    }
    setIsMeetingReady(false); // Reset to show input fields
    setRoomName(''); // Clear room name input
    setUserName(''); // Clear user name input
  };

  return (
    <section className="min-h-screen w-full mt-10 flex flex-col items-center justify-center">
      {/* Input Section with RoomForm */}
      
      {!isMeetingReady && (
        <div className='max-w-lg p-5 mx-auto'>
          <RoomForm
          roomName={roomName}
          setRoomName={setRoomName}
          userName={userName}
          setUserName={setUserName}
          handleJoinRoom={handleJoinRoom}
        />
        </div>
      )}

      
      {/* Loader */}
      {isLoading && <Loader />}

      {/* Jitsi Meeting Section */}
      {isMeetingReady && (
        <div className="relative w-full h-screen">
          <JitsiMeeting
            domain={YOUR_DOMAIN}
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              disableModeratorIndicator: true,
              enableEmailInStats: false,
              startScreenSharing: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            }}
            userInfo={{
              displayName: userName,
            }}
            onApiReady={(externalApi) => {
              console.log('Jitsi External API is ready');
              setIsLoading(false); // Hide loader when meeting loads
              externalApiRef.current = externalApi; // Store API instance
              externalApi.addEventListener('readyToClose', handleExitRoom); // Listen for meeting close
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100vh'; // Full height iframe
              iframeRef.style.width = '100%'; // Full width iframe
            }}
          />

         
        </div>
      )}
    </section>
  );
};

export default Meeting;
