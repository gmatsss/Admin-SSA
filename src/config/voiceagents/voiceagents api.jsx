import React, { useState, useEffect, useRef } from "react";
import "./voiceagents.css";
import BotIcon from "@mui/icons-material/Android";
import TalkIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";
import ReconnectingWebSocket from "reconnecting-websocket";

const agentId = "MC-Agent-1rRd1y-j0Q6SAniKiDwSE";
const apiKey = "ak-e243fc75faf94f9fac1af1a4b8439f7e";

const VoiceAgents = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [socket, setSocket] = useState(null);
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const concatenatedBase64 = useRef("");
  const isDecoding = useRef(false);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const base64ToArrayBuffer = (base64) => {
    try {
      if (base64.length % 4 !== 0) {
        console.error("Invalid base64 length:", base64.length);
        return null;
      }

      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (e) {
      console.error("Base64 decoding error:", e);
      return null;
    }
  };

  const processAudioChunks = async () => {
    if (isDecoding.current) {
      return;
    }
    isDecoding.current = true;

    while (concatenatedBase64.current.length >= 8192) {
      // Increased chunk size for better buffering
      const chunk = concatenatedBase64.current.slice(0, 8192);
      concatenatedBase64.current = concatenatedBase64.current.slice(8192);

      const audioBuffer = base64ToArrayBuffer(chunk);
      if (!audioBuffer) {
        console.error("Failed to convert base64 to ArrayBuffer.");
        isDecoding.current = false;
        return;
      }

      try {
        const decodedData = await audioContext.current.decodeAudioData(
          audioBuffer
        );
        console.log("Audio decoded successfully");

        const source = audioContext.current.createBufferSource();
        source.buffer = decodedData;
        source.connect(audioContext.current.destination);
        source.start(0);

        await new Promise((resolve) => {
          source.onended = resolve;
        });
      } catch (e) {
        console.error("Audio decoding error:", e);
      }
    }

    isDecoding.current = false;
  };

  const handleTalkClick = () => {
    if (!isTalking) {
      const ws = new ReconnectingWebSocket(
        `wss://api.play.ai/v1/talk/${agentId}`
      );

      ws.onopen = () => {
        console.log("WebSocket connected!");
        ws.send(
          JSON.stringify({
            type: "setup",
            apiKey,
            inputEncoding: "mulaw",
            inputSampleRate: 16000,
            outputFormat: "mp3",
            outputSampleRate: 44100,
          })
        );
      };

      ws.onmessage = (message) => {
        const event = JSON.parse(message.data);
        if (event.type === "audioStream") {
          const audioData = event.data;
          console.log("Received audio data:", audioData);

          if (
            !audioData ||
            typeof audioData !== "string" ||
            !/^[A-Za-z0-9+/]+[=]{0,2}$/.test(audioData)
          ) {
            console.error("Invalid base64 data received:", audioData);
            return;
          }

          concatenatedBase64.current += audioData;
          processAudioChunks();
        }
      };

      setSocket(ws);
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    setIsTalking(!isTalking);
  };

  return (
    <div className="VA-container">
      <div className="VA-bots-column">
        <div className="VA-bot-card">
          <div className="VA-bot-card-icon">
            <BotIcon />
          </div>
          <div className="VA-bot-card-details">
            <h4>Assistant Bot</h4>
            <p>Ready to assist you with any queries.</p>
          </div>
        </div>
      </div>
      <div className="VA-talk-button-column">
        <button className="VA-talk-button" onClick={handleTalkClick}>
          <TalkIcon className="VA-button-icon" /> {isTalking ? "Stop" : "Talk"}
        </button>
        <button className="VA-configure-button">
          <SettingsIcon className="VA-button-icon" /> Configure
        </button>
      </div>
    </div>
  );
};

export default VoiceAgents;
