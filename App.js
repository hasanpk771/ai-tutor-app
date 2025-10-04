import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/ask", {
        prompt: prompt,
      });
      setReply(response.data.reply);
    } catch (err) {
      console.error(err);
      setReply("❌ Error from server");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <h1>AI Tutor Chat</h1>
      <textarea
        rows={5}
        style={{ width: "100%", padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question here..."
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{ marginTop: 10, padding: "10px 20px" }}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 5,
            minHeight: 50,
          }}
        >
          {reply}
        </div>
      )}
    </div>
  );
}

export default App;
