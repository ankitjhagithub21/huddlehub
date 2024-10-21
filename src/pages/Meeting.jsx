import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState} from 'react';
import Loader from '../components/Loader';
import RoomForm from '../components/RoomForm'; // Import RoomForm component

const Meeting = () => {
  const YOUR_DOMAIN = 'meet.jit.si'; // Public Jitsi instance or custom server
  const [roomName, setRoomName] = useState(''); // Room name input state
  const [isMeetingReady, setIsMeetingReady] = useState(false); // Toggle meeting visibility
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [userName, setUserName] = useState(''); // User name input state
  

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

 

  return (
    <>
  
      {/* Input Section with RoomForm */}
      
      {!isMeetingReady && (
       
          <RoomForm
          roomName={roomName}
          setRoomName={setRoomName}
          userName={userName}
          setUserName={setUserName}
          handleJoinRoom={handleJoinRoom}
        />
      
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
              setIsLoading(false); 
             
              
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100vh'; // Full height iframe
              iframeRef.style.width = '100%'; // Full width iframe
            }}
          />

         
        </div>
      )}
    </>
  );
};

export default Meeting;
