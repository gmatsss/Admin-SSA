import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";

const Playai = () => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext when component mounts
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
  }, []);

  // API configuration
  const API_KEY = process.env.REACT_APP_API_KEY;
  const AGENT_ID = process.env.REACT_APP_AGENT_ID;
  const WS_URL = `wss://api.play.ai/v1/agent-conversation?agentId=${AGENT_ID}`;

  // Connect to WebSocket server
  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onopen = handleWebSocketOpen;
    wsRef.current.onmessage = handleAudioMessage;
    wsRef.current.onclose = handleWebSocketClose;
    wsRef.current.onerror = handleWebSocketError;
  };

  const handleWebSocketClose = () => {
    setIsConnected(false);
    console.log("WebSocket disconnected.");
  };

  const handleWebSocketError = (error) => {
    console.error("WebSocket error:", error);
  };

  // WebSocket event handlers
  const handleWebSocketOpen = () => {
    setIsConnected(true);
    console.log("WebSocket connected.");

    // Send setup message
    const setupMessage = {
      type: "setup",
      apiKey: API_KEY,
      enableVad: false,
      outputFormat: "mulaw",
      outputSampleRate: 16000,
    };
    wsRef.current.send(JSON.stringify(setupMessage));
  };

  const handleAudioMessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "audioStream" && message.data) {
      const audioData = Uint8Array.from(atob(message.data), (c) =>
        c.charCodeAt(0)
      );
      playAudio(audioData);
    }
  };

  const playAudio = (audioData) => {
    const pcmData = decodeMuLaw(audioData);
    const sampleRate = 16000; // Ensure this matches the rate at which the audio was originally sampled

    const audioBuffer = audioContextRef.current.createBuffer(
      1, // Mono channel
      pcmData.length,
      sampleRate
    );

    // Copy the decoded PCM data into the AudioBuffer
    audioBuffer.copyToChannel(pcmData, 0);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = audioContextRef.current.createGain();
    gainNode.gain.value = 1; // Adjust gain to appropriate levels, originally set to 0.8

    // Adjusting filter settings
    const lowPassFilter = audioContextRef.current.createBiquadFilter();
    lowPassFilter.type = "lowpass";
    lowPassFilter.frequency.value = 8000; // Lower frequency to help remove higher frequency noise

    // Connect nodes in the correct order
    source.connect(gainNode);
    gainNode.connect(lowPassFilter);
    lowPassFilter.connect(audioContextRef.current.destination);

    source.start();
  };

  const decodeMuLaw = (input) => {
    const max = 32635;
    const output = new Float32Array(input.length);

    const muLawTable = new Int16Array(256);
    for (let i = 0; i < 256; i++) {
      const sign = i & 0x80 ? -1 : 1;
      const exponent = (i >> 4) & 0x07;
      const mantissa = i & 0x0f;
      const magnitude = ((mantissa << 1) + 33) << (exponent + 2);
      muLawTable[i] = sign * magnitude;
    }

    for (let i = 0; i < input.length; i++) {
      output[i] = muLawTable[input[i] ^ 0xff] / max;
    }

    return output;
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<MicIcon />}
        onClick={connectWebSocket}
        disabled={isConnected}
      >
        {isConnected ? "Connected" : "Connect WebSocket"}
      </Button>
    </div>
  );
};

export default Playai;
