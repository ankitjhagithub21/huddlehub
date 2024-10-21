import { useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const RecordView = ({ onStopRecording }) => {
  const startRecordingRef = useRef(null); // Store the startRecording function
  const stopRecordingRef = useRef(null); // Store the stopRecording function
  const mediaBlobUrlRef = useRef(null); // Store the mediaBlobUrl

  useEffect(() => {
    return () => {
      // Cleanup function to stop recording if necessary
      if (stopRecordingRef.current) stopRecordingRef.current();
    };
  }, []);

  return (
    <div>
      <ReactMediaRecorder
        video
        render={({ startRecording, stopRecording, mediaBlobUrl }) => {
          startRecordingRef.current = startRecording;
          stopRecordingRef.current = stopRecording;

          // Check if a new mediaBlobUrl is available
          if (mediaBlobUrl && mediaBlobUrl !== mediaBlobUrlRef.current) {
            mediaBlobUrlRef.current = mediaBlobUrl; // Store the latest mediaBlobUrl
            onStopRecording(mediaBlobUrl); // Call the stop recording handler with the URL
          }

          return <></>; // You can add UI elements here for user feedback if needed
        }}
      />
    </div>
  );
};

export default RecordView;
