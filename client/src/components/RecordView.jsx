
import { useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = ({ onStopRecording }) => {
  const startRecordingRef = useRef(null); // Store the startRecording function
  const stopRecordingRef = useRef(null); // Store the stopRecording function

  const downloadRecording = (mediaBlobUrl) => {
    const a = document.createElement("a");
    a.href = mediaBlobUrl;
    a.download = "recording.mp4"; // File name for the downloaded video
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    if (startRecordingRef.current) {
      startRecordingRef.current(); // Start recording on component mount
    }
    return () => {
      if (stopRecordingRef.current) stopRecordingRef.current(); // Stop recording on unmount
    };
  }, []);

  return (
    <div>
      <ReactMediaRecorder
        video
        render={({ startRecording, stopRecording, mediaBlobUrl }) => {
          startRecordingRef.current = startRecording;
          stopRecordingRef.current = stopRecording;

          if (mediaBlobUrl) {
            downloadRecording(mediaBlobUrl); // Download recording when available
            onStopRecording(); // Navigate to home page
          }

          return <></>;
        }}
      />
    </div>
  );
};

export default RecordView;
