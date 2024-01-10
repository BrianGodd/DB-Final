// UserData.js
import axios from 'axios';
import SpotifyPlayBack from './SpotifyPlayBack';

let username = '';
let nickname = '';
let spotifyToken = '';
let spotifyPlayToken = 'BQDR1vptzDP_fDZsSa9vgxBw2GH_4FQIoFckSGxcdaZjFR3djeC2DirsfhULDX04toBJgmJMoZ42QheEHBd3o6ooq1tsxYUkHF5flHs2OVJ3NON7N-EDr1wMXZHfV-FxOgo6Z8Rqr2156jrb-rnohL2g1xYrAPPmaPLPjmFpXwyMwJi3v2FKJKV0h8wc7auCDs-cF79oqOjE-aOU8rh5b4IZ3VmHqjr1';
let uris = ['10AC3n6YglAdIpi4TUAjNZ', '5eY7692tmgHB9dbmq6wa2M'];
let updateUrisCallback = () => {}; // 初始化一個回調函數

const setUpdateUrisCallback = (callback) => {
  updateUrisCallback = callback;
};

const UpdateUris = async (newList) => {
  uris = [...uris, ...newList];
  updateUrisCallback(uris, newList.length);
  console.log(uris);
};

const UpdatePlaying = async() =>{
  updateUrisCallback(uris);
};

const UpdateName = async (newUsername, newNickname) => {
    console.log("Updating name...");
    username = newUsername;
    nickname = newNickname;
    console.log("Name updated:", username, nickname);
};

const UpdateToken = async () => {
    try {
      const client_id = 'f64a5ad8107f4f9494ac7a24f62254ae';
      const client_secret = '8133deb2008e45e2b66da1e439862d9e';
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = 'grant_type=client_credentials&scope=user-read-playback-state user-modify-playback-state user-read-currently-playing';
      
      const authString = `${client_id}:${client_secret}`;
      const base64AuthString = btoa(authString); // Using btoa to base64 encode
  
      const response = await axios.post(token_url, data, {
        headers: {
            'Authorization': 'Basic ' + base64AuthString,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log(response.data.access_token);
      spotifyToken = response.data.access_token;
    } catch (error) {
      console.error('Error update data', error);
    }
  };

const UpdateSpotifyPlay = async (newToken) => {
  console.log(newToken);
  spotifyPlayToken = newToken;
}
  

export { username, nickname, spotifyToken, UpdateName, UpdateToken, uris, UpdateUris, setUpdateUrisCallback, UpdatePlaying, spotifyPlayToken, UpdateSpotifyPlay};
