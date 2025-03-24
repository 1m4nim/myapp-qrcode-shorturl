import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const App: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!longUrl) return;
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${longUrl}`);
      setShortUrl(response.data);
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten the URL.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>URL Shortener & QR Code Generator</h2>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
        style={{ width: "300px", padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleShorten} style={{ padding: "8px 15px", cursor: "pointer" }}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <QRCode value={shortUrl} size={150} />
        </div>
      )}
    </div>
  );
};

export default App;
