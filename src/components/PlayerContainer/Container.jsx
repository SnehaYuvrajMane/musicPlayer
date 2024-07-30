import React, { useEffect, useState } from "react";
import SongList from "../SongsList/SongList";
import Player from "../Player/Player";
import "./Container.css";
import { MdMenu } from "react-icons/md";


const Container = () => {
  const [songs, setSongs] = useState([]);
  const [songsOpen, setSongsOpen] = useState(
    window.innerWidth <= 768 ? false : true
  );
  const [activeSong, setActiveSong] = useState(0);
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URI}`);
        const data = await res.json();
        setSongs(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, []);

  const handleOpenSongs = () => {
    setSongsOpen(!songsOpen);
  };

  const nextSong = () => {
    if (activeSong === songs.length - 1) {
      setActiveSong(0);
    } else {
      setActiveSong(activeSong + 1);
    }
  };

  const prevSong = () => {
    if (activeSong === 0) {
      setActiveSong(songs.length - 1);
    } else {
      setActiveSong(activeSong - 1);
    }
  };

  return (
    <div className="container">
      {songs.length > 0 ? (
        <>
          <div
            className="bg"
            style={{
              background: songs
                ? `url(${process.env.REACT_APP_IMAGES_URI}${songs[activeSong].cover})`
                : "",
            }}
          ></div>
          <div className="top-bar">
            <img className="logo-img" src="/Logo.png" alt="Logo" />
            <button className="toggle-btn" onClick={handleOpenSongs}>
              <MdMenu/>
            </button>
          </div>

          {songsOpen && (
            <SongList
              songs={songs}
              activeSong={activeSong}
              setActiveSong={setActiveSong}
            />
          )}
          <Player
            cover={`${process.env.REACT_APP_IMAGES_URI}${
              songs && songs[activeSong].cover
            }`}
            link={songs && songs[activeSong].url}
            title={songs && songs[activeSong].name}
            artist={songs && songs[activeSong].artist}
            nextSong={nextSong}
            prevSong={prevSong}
          />
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default Container;
