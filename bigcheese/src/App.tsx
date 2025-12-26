import { useState, useEffect, useRef } from "react";
import "./App.css";

const pages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 11, 12];

const pageText = [
  "Hey Libby",
  "I hope you had a nice Christmas with your family",
  "I wanted this to be a lot cooler, but I ran out of time, haha",
  "So you're just gonna have to settle with this:",
  "When we met up again over the summer, I never would've thought we'd be where we are now",
  "But I'm really glad we you are in my life",
  "For the last few months,\nyou have been nothing but a constant force of good in my life",
  "Even at my lowest points,\nyou were a warm and\ncomforting presence",
  "I hope you know you are\na beautiful soul,\nand that I am very glad\nto have met you again",
  "I treasure you so very much;\nI hope you share\nthe same sentiment",
  "Here's a picture of a deer (click next bc ion know how to code)",
  "",
];

export default function App() {
  const [page, setPage] = useState(0);
  const [displayText, setDisplayText] = useState(pageText[0]);
  const [visible, setVisible] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); // soft default

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    setVisible(false);
    const swap = setTimeout(() => {
      setDisplayText(pageText[page]);
      setVisible(true);
    }, 300);
    return () => clearTimeout(swap);
  }, [page]);

  // Keep audio volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      {/* Background music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/stuff/lovergirl.mp3" type="audio/mpeg" />
      </audio>

      <div className="container">
        <div className={`textbox ${visible ? "visible" : ""}`}>
          {page === 11 ? (
            <img
              src="/stuff/deer.jpeg"
              alt="A deer"
              className="page-image"
            />
          ) : (
            displayText.split("\n").map((line, i) => (
              <div key={i} className="line">
                {line}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Music controls */}
      <div className="music-controls">
        {/* Now Playing: Image + Song Name */}
        <div className="now-playing">
        <img src="/stuff/laufey.jpg" alt="Album art" className="song-art" />
          <span className="song-title">Lover Girl</span>
        </div>

        <button className="music-toggle" onClick={toggleMusic}>
          {playing ? "||" : "▶"}
        </button>

        <input
          className="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>

      {/* Page number */}
      <div className="page-box visible">{pages[page]}</div>

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, pages.length - 1))
          }
          disabled={page === pages.length - 1}
        >
          Next
        </button>
      </div>
    </>
  );
}
