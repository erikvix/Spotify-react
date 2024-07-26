import React, { useState, useEffect } from "react";
import SpotifyUser from "../components/SpotifyUser";
import { storeToken } from "../api/storeToken";
import api from "../api/index";

const App = () => {
  const [artist, setArtist] = useState({});
  const [user, setUser] = useState({});
  const [track, setTrack] = useState({});
  const token = localStorage.getItem("access_token");

  var track_endpoint = "me/top/tracks";
  var track_endpointtest = "/top/tracks?time_range=short_term";
  const artist_endpoint = "/me/top/artists";
  const user_endpoint = "/me";

  async function getData(endpoint, setFunction) {
    await api
      .get(endpoint)
      .then((response) => {
        setFunction(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    storeToken();
    // getData(track_endpoint, setTrack);
    getData(user_endpoint, setUser);
    // getData(artist_endpoint, setArtist);
  }, []);

  return (
    <div className="mt-10">
      <SpotifyUser />

      {track.items && (
        <div className="tracks">
          <h1 className="center text-center">Top Tracks</h1>
          <div className="tracks-options flex flex-col items-center justify-center gap-4 mb-20 mt-8">
            <div className="track-row flex items-center justify-center gap-4">
              <button>Top Tracks</button>
              <button>Top Artists</button>
              <button>Top Genres</button>
            </div>
            <div className="track-row flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  getData(track_endpoint + "?time_range=short_term", setTrack)
                }
              >
                Most Recent
              </button>
              <button onClick={() => getData(track_endpoint, setTrack)}>
                6 months
              </button>
              <button
                onClick={() =>
                  getData(track_endpoint + "?time_range=long_term", setTrack)
                }
              >
                All time
              </button>
            </div>
          </div>
          <div className="track-grid grid grid-cols-5 gap-4">
            {track.items.map((track, index) => {
              return (
                <div
                  className="track-box flex flex-col items-center gap-4 mb-8"
                  key={index}
                >
                  <img
                    className="albuns w-60 h-60"
                    src={track.album.images[0].url}
                  />
                  <div className="track-box-text flex flex-col items-center">
                    <h3 className="center text-center">{track.name}</h3>
                    <h3>{track.artists[0].name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
