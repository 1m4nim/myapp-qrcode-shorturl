import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./styles/App.css"; // スタイルシートをインポート

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
    <div className="main">
      <h2 className="shorturl-qrcode">あなたが持ってるURLを短く<br />そしてQRコードまで生成！</h2>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
        style={{ width: "300px", padding: "8px", marginRight: "10px" }}
      />
      <button className="button" onClick={handleShorten} >
        Shorten
      </button>

      {shortUrl && (
        <div className="qr-container">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <QRCode value={shortUrl} size={150} />
        </div>
      )}
    </div>
  );
};

export default App;
