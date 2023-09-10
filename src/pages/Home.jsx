import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'

const App = () => {
    const [token, setToken] = useState();
    const [artist, setArtist] = useState({})
    const [user, setUser] = useState({})
    const [track, setTrack] = useState({})

    var track_endpoint = "https://api.spotify.com/v1/me/top/tracks";
    var track_endpointtest = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term";
    const artist_endpoint = "https://api.spotify.com/v1/me/top/artist";
    const user_endpoint = "https://api.spotify.com/v1/me";


    const getParams = (hash) => {
        const hashContent = hash.substring(1);
        const paramsSplit = hashContent.split('&');
        let params = {};
        paramsSplit.forEach((param) => {
            const values = param.split('=');
            params[values[0]] = values[1];
        });
        return params;
    };

    async function getData(endpoint, setFunction) {
        await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(response =>{
            setFunction(response.data)
            console.log(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    function handleMonth (){
        getData(track_endpointtest, setTrack);
    }
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            var tokens = getParams(hash);
            localStorage.setItem('token', tokens.access_token);
            setToken(tokens.access_token);
            window.history.pushState({}, null, '/home');
        }
        getData(track_endpoint, setTrack);
        getData(user_endpoint, setUser);
        getData(artist_endpoint, setArtist);
    }, []);

    return (
        <div className='App'>
        {
            user.display_name &&
            <div className='profile'>
                <h1>Hello <span>
                {user.display_name}
                </span></h1>
                <img className='avatar' src={user.images[1].url}/>
            </div>
        }
        {
            track.items &&
            <div className='tracks'>
                <h2>Top tracks</h2>
                <button onClick={() => handleMonth()} >1 Month</button>
                <div className='track-grid'>
                    {
                        track.items.map((track, index) =>{
                            return(
                                <div key={index}>
                                    <img className='albuns' src={track.album.images[0].url}/>
                                    <h3>{track.name}</h3>
                                    <h3>{track.artists[0].name}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        }
        </div>
    );
};

export default App;
