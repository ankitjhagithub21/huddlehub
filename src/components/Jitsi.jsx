import { JitsiMeeting } from '@jitsi/react-sdk';


const Jitsi = () => {
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const YOUR_DOMAIN = 'meet.jit.si'; // Use public Jitsi instance or your custom Jitsi server
  
  return (
    <div>
      
      <JitsiMeeting
        domain={YOUR_DOMAIN}
        roomName="MyAwesomeRoom" // Make sure it's a unique room name
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
          displayName: 'Ankit Jha',
        }}
        onApiReady={(externalApi) => {
          console.log('Jitsi External API is ready');
          setIsLoading(false); // Hide loading spinner when API is ready
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '500px'; // Customize iframe height
          iframeRef.style.width = '100%'; // Full width iframe
        }}
      />

    </div>
  )
}

export default Jitsi
