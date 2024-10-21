import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Meeting = () => {
  const YOUR_DOMAIN = "meet.jit.si";
  const [isLoading, setIsLoading] = useState(true);
  const [isMeetingReady, setIsMeetingReady] = useState(false);
  const [userName, setUserName] = useState("");
  const { user,loading } = useSelector((state) => state.user);
  const { roomName } = useParams();
  const navigate = useNavigate();
  const apiRef = useRef(null); // Store Jitsi API instance

  
  // Set user name when user object changes
  useEffect(() => {
  
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  if(loading){
    return <Loader/>
  }

  // Navigate to home if user is not logged in
  if (!user) {
    return <Navigate to="/" />;
  }




  return (
    <>
    {
      isLoading && <Loader/>
    }

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
            apiRef.current = api; // Store API instance in ref
            setIsLoading(false);
            setIsMeetingReady(true);
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100vh";
            iframeRef.style.width = "100%";
          }}
        />
      </div>

     
    </>
  );
};

export default Meeting;
