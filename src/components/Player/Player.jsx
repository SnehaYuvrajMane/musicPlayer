import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import "./Player.css";

const Player = ({ title, artist, cover, link, nextSong, prevSong }) => {
  const [songLink, setLink] = useState(link);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const seekbarRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setLink(link);
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(true);
    }
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(parseInt(audioElement.duration));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [link]);

  const handleSeek = (event) => {
    const seekTo =
      (event.nativeEvent.offsetX / seekbarRef.current.clientWidth) * duration;
    audioRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  return (
    <div className="player">
      <h1 className="title">{title}</h1>
      <p className="artist">{artist}</p>
      <div className="inner-player">
        <img src={cover} alt="cover" className="cover" />
        <audio ref={audioRef} autoPlay>
          <source src={songLink} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        {/* seek bar  */}
        <div
          ref={seekbarRef}
          onClick={handleSeek}
          style={{
            position: "relative",
            width: "80%",
            height: "10px",
            backgroundColor: "#ccc",
            cursor: "pointer",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${(currentTime / duration) * 100}%`,
              height: "100%",
              backgroundColor: "#808080",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className="time">
          <div>
            {parseInt(currentTime / 60)}:{parseInt(parseInt(currentTime) % 60)}
          </div>
          /
          <div>
            {" "}
            {parseInt(duration / 60)}:{parseInt(parseInt(duration) % 60)}
          </div>
        </div>
        {/* controls  */}
        <div className="controls">
          <MdSkipPrevious className="icon" onClick={() => prevSong()} />
          {isPlaying ? (
            <FaPause
              className="icon pause"
              onClick={() => {
                audioRef.current.pause();
                setIsPlaying(false);
              }}
            />
          ) : (
            <FaPlay
              className="icon play"
              onClick={() => {
                audioRef.current.play();
                setIsPlaying(true);
              }}
            />
          )}

          <MdSkipNext className="icon" onClick={() => nextSong()} />
        </div>
      </div>
    </div>
  );
};

export default Player;
