import React, { useState } from "react";
import axios from "axios";
import ImageEditor from "./Component/ImageEditor";
import LandingPage from "./Component/LandingPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../src/App.css";
function App() {
  const [originalUrl, setoriginalUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url) => {
    // Regular expression for validating URLs
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|" + // Domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" + // Port and path
        "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" + // Query string
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url); // Returns true if the URL is valid
  };

  const handleSubmit = () => {
    if (validateUrl(originalUrl)) {
      axios
        .post("http://localhost:3001/api/short", { originalUrl })
        .then((res) => {
          console.log("API Responce", res.data);
          setshortUrl(res.data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
      setError("");
    } else {
      setError("Please enter a valid URL.");
    }
  };
  const handleClear = () => {
    setoriginalUrl(""); // Clears the input box
  };
  const handleCopy = () => {
    if (shortUrl && shortUrl.shortUrl) {
      navigator.clipboard
        .writeText(shortUrl.shortUrl)
        .then(() => {
          alert("Short URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <>
      {/* <Routes>
        <Route path="/editor" component={ImageEditor} />
        <Route path="/" component={LandingPage} />
      </Routes>
     */}

      <main>
        <div id="header-div">
          <h1 class="">Link Shortener</h1>
        </div>
        <div id="content-div">
          <div id="input-div">
            <input
              value={originalUrl}
              onChange={(e) => setoriginalUrl(e.target.value)}
              type="text"
              name="originalUrl"
              className="text-field content-row"
              placeholder="Enter URL here . . ."
              id="input-field"
              required
            />

            <button
              onClick={handleSubmit}
              type="button"
              className="content-row button"
              id="shorten"
            >
              Shorten
            </button>
            <button
              type="button"
              id="clear-btn"
              class="content-row button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <div id="output-div">
            <div className="content-row" id="new-url-label">
              Your short URL:
              {shortUrl && (
                <div div className="">
                
                  <a
                    style={{ color: "black", zIndex: "1000" }}
                    href={shortUrl?.shortUrl}
                    rel=""
                    target="_blank"
                    className="short-url"
                  >
                    {shortUrl?.shortUrl}
                  </a>
                  <div className="or">
                    OR
                  </div>
                  <div >
                    {shortUrl && (
                      <>
                        <img src={shortUrl.qrCodeImg} alt="__img" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              // id="copy-btn"
              data-clipboard-target="#new-url"
              class="content-row button"
              onClick={handleCopy} // Calls handleCopy on button click
            >
              Copy
            </button>
          </div>
          <div class="" id="error-div">
            <p class="content-row" id="error-text"></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
