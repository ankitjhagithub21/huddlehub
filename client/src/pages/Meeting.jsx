import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';


const Meeting = () => {
  const YOUR_DOMAIN = 'meet.jit.si'; 
  const location = useLocation();
  const { attendees } = location.state || {}; // Get attendees data from the location state
  const [roomName, setRoomName] = useState(location.pathname.split('/').pop()); // Extract room name from URL
  const [isMeetingReady, setIsMeetingReady] = useState(false); // Toggle meeting visibility
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [userName, setUserName] = useState(''); // User name input state

  useEffect(() => {
    // Set user name from attendees or prompt for a name
    if (attendees && attendees.length > 0) {
      setUserName(attendees[0].name); // Example: Set the first attendee's name
    } else {
      // Optionally prompt for a name if there are no attendees
      setUserName(prompt('Please enter your name:') || 'Guest');
    }
  }, [attendees]);

  return (
    <>
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
            onApiReady={(api) => {
            
              setIsLoading(false); // Hide loader when meeting loads
           
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
