import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
const URLShortener = () => {
    const [longURL, setLongURL] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [error, setError] = useState('');
    const handleURLChange = (e) => {
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
        }
        catch (err) {
            setError('URLの短縮に失敗しました');
            console.error(err);
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "URL\u77ED\u7E2E\u3068QR\u30B3\u30FC\u30C9\u751F\u6210" }), _jsx("input", { type: "text", value: longURL, onChange: handleURLChange, placeholder: "\u9577\u3044URL\u3092\u5165\u529B" }), _jsx("button", { onClick: handleShortenURL, children: "URL\u3092\u77ED\u7E2E" }), error && _jsx("p", { style: { color: 'red' }, children: error }), shortURL && (_jsxs("div", { children: [_jsxs("p", { children: ["\u77ED\u7E2E\u3055\u308C\u305FURL: ", _jsx("a", { href: shortURL, target: "_blank", rel: "noopener noreferrer", children: shortURL })] }), _jsx(QRCode, { value: shortURL })] }))] }));
};
export default URLShortener;
