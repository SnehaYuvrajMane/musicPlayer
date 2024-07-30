import { useState } from "react";
import "./SongsList.css";

const SongList = ({ songs, activeSong, setActiveSong }) => {
    const [songsData, setSongsData] = useState(songs);
  const onSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredSongs = songs.filter((song) =>
      song.name.toLowerCase().includes(value)
    );
    setSongsData(filteredSongs);
  };

  return (
    <div className="list">
      <div className="tabs">
        <p className="active">For You</p>
        <p>Top Tracks</p>
      </div>
      <div className="searchbar">
        <input
          type="text"
          name="Songname"
          id="songname"
          className="search-input"
          placeholder="Search for songs"
          onChange={onSearch}
        />
      </div>
      <div className="songs">
        {songsData &&
          songsData.map((song, index) => (
            <div
              className={`song ${index === activeSong ? "active-song" : ""}`}
              key={song.id}
              onClick={() => setActiveSong(index)}
            >
              <img
                src={`${process.env.REACT_APP_IMAGES_URI}${song.cover}`}
                alt="song"
                className="song-thumbnail"
              />
              <div className="song-info">
                <p className="song-name">{song.name}</p>
                <p className="artist">{song.artist}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SongList;
