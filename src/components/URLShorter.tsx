import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const URLShortener: React.FC = () => {
  const [longURL, setLongURL] = useState<string>('');
  const [shortURL, setShortURL] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongURL(e.target.value);
  };

  const handleShortenURL = async () => {
    if (longURL.trim() === '') {
      setError('URLを入力してください');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`https://api.tinyurl.com/create?url=${longURL}`, {
        headers: {
          'Authorization': 'Bearer tZRdGl01DLPxkOM4r2FYrP4g7OJei3beB58MJcZhCPijvwVSVjx8pZRVEKHX', // APIキーを設定
        },
      });
      setShortURL(response.data.data.tiny_url);
    } catch (err) {
      setError('URLの短縮に失敗しました');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>URL短縮とQRコード生成</h1>
      <input
        type="text"
        value={longURL}
        onChange={handleURLChange}
        placeholder="長いURLを入力"
      />
      <button onClick={handleShortenURL}>URLを短縮</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortURL && (
        <div>
          <p>短縮されたURL: <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a></p>
          <QRCode value={shortURL} />
        </div>
      )}
    </div>
  );
};

export default URLShortener;
