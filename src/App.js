import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Show user message
    setChatLog([...chatLog, { sender: "user", text: message }]);

    const res = await fetch("https://ai-tutor-app-uhk8.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setChatLog((prev) => [...prev, { sender: "ai", text: data.reply }]);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Voice Tutor (Text Demo)</h1>
      <div style={{ marginBottom: 10 }}>
        {chatLog.map((c, i) => (
          <div key={i} style={{ margin: 5 }}>
            <b>{c.sender === "user" ? "You:" : "AI:"}</b> {c.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%", marginRight: 10 }}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
