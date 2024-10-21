import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Meeting = () => {
  const YOUR_DOMAIN = 'meet.jit.si'; 

  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isMeetingReady, setIsMeetingReady] = useState(false); // Meeting ready state
  const [userName, setUserName] = useState(''); // User name input state
  const { user } = useSelector(state => state.user);
  const {roomName} = useParams()

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

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
              setIsMeetingReady(true); // Set meeting as ready
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
