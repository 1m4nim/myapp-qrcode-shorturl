import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import style from  "./styles/App.css";

const App = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const handleShorten = async () => {
        if (!longUrl)
            return;
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${longUrl}`);
            setShortUrl(response.data);
        }
        catch (error) {
            console.error("Error shortening URL:", error);
            alert("Failed to shorten the URL.");
        }
    };
    return (_jsxs("div", { style: { textAlign: "center", marginTop: "50px" }, children: [_jsx("h2", { children: "あなたが持ってるURLを短く！そしてQRコードまで生成！" }), _jsx("input", { type: "text", value: longUrl, onChange: (e) => setLongUrl(e.target.value), placeholder: "Enter long URL", style: { width: "300px", padding: "8px", marginRight: "10px" } }), _jsx("button", { onClick: handleShorten, style: { padding: "8px 15px", cursor: "pointer" }, children: "Shorten" }), shortUrl && (_jsxs("div", { style: { marginTop: "20px" }, children: [_jsxs("p", { children: ["Shortened URL: ", _jsx("a", { href: shortUrl, target: "_blank", rel: "noopener noreferrer", children: shortUrl })] }), _jsx(QRCode, { value: shortUrl, size: 150 })] }))] }));
};
export default App;
