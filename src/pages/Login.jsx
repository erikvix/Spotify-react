import React from 'react'
import {CLIENT_ID, CLIENT_SECRET, URL_AFTER_LOGIN,AUTH_ENDPOINT, SCOPES_URL_PARAM} from '../auth/index'


const Login = () => {
    const handleLogin= () =>{
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${AUTH_ENDPOINT}&scope=${SCOPES_URL_PARAM}&response_type=token`;  
    }
    return ( 
        <>
            <h1>Login with spotify</h1>
            <button onClick={() =>handleLogin()}>Login</button>
        </>
     );
}
 
export default Login;