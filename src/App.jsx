import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = "https://sukhdev-editor-backend.onrender.com"; // change to your Render backend

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Socket.IO React Chat 🚀</h1>
      <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", minHeight: "200px" }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}
