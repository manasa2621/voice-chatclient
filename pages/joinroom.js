import { useEffect, useRef, useState } from "react";

function JoinRoom({ meetingId }) {
  const [isVoiceChatting, setIsVoiceChatting] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://voicechatfinal.onrender.com/socket.io?meetingId=${meetingId}`
    );

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      console.log("Received message:", event.data);
      const audioData = event.data;
      playReceivedAudio(audioData);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.current.close();
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [meetingId]);

  const startVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setIsVoiceChatting(true);
      startSendingAudio(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopVoiceChat = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }
    setIsVoiceChatting(false);
    ws.current.send(JSON.stringify({ type: "stopAudio" }));
  };

  const startSendingAudio = (stream) => {
    const audioChunks = [];
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        ws.current.send(audioBlob);
      }
    };

    mediaRecorder.start();
  };

  const playReceivedAudio = (audioData) => {
    const audio = new Audio(URL.createObjectURL(audioData));
    audio.play();
  };

  return (
    <div>
      <h1>Joining Room: {meetingId}</h1>
      <button onClick={startVoiceChat}>Start Voice Chat</button>
      <button onClick={stopVoiceChat}>Stop Voice Chat</button>
      {isVoiceChatting && (
        <div>
          <p>Audio Controls</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { meetingId } = context.query;
  return {
    props: {
      meetingId,
    },
  };
}

export default JoinRoom;
