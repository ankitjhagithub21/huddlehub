// Meeting.js
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RecordView from "../components/RecordView";

const Meeting = () => {
  const YOUR_DOMAIN = "meet.jit.si";
  const [isLoading, setIsLoading] = useState(true);
  const [isMeetingReady, setIsMeetingReady] = useState(false);
  const [userName, setUserName] = useState("");
  const { user } = useSelector((state) => state.user);
  const { roomName } = useParams();
  const navigate = useNavigate();
  const apiRef = useRef(null); // Store Jitsi API instance

  // Set user name when user object changes
  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  // Navigate to home if user is not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // Stop recording and navigate to home
  const handleStopRecording = () => {
    navigate("/"); // Navigate to home page after recording ends
  };

  // End meeting and navigate to home
  const handleEndMeeting = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand("hangup"); // End the meeting
      navigate("/"); // Ensure user navigates to home
    }
  };

  return (
    <>
      {isLoading && <Loader />}

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

            // Add listener for 'readyToClose' event
            api.addEventListener("readyToClose", () => {
              if (isMeetingReady) {
                handleStopRecording(); // Stop recording and navigate to home
              }
            });
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100vh";
            iframeRef.style.width = "100%";
          }}
        />
      </div>

      {!isLoading && isMeetingReady && (
        <>
          <RecordView onStopRecording={handleStopRecording} />

          {/* End Meeting Button */}
          <div className="absolute top-4 left-4 z-50">
            <button
              onClick={handleEndMeeting}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              End Meeting
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Meeting;
