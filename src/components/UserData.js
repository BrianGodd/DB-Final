// UserData.js
import axios from 'axios';
import SpotifyPlayBack from './SpotifyPlayBack';

let username = '';
let nickname = '';
let spotifyToken = '';
let spotifyPlayToken = 'BQA4jGR068ULNaezdb2SYXnH8nNvTT5DrM5ra2ttffAyljvNJzxfQOg3ZJmc7uOytzVPayBthUAMZpt53aqTXRwLnMUZdNqPmwp9dCGmHnjPckxlmvlNUWVf_y2NO0EoSS1FASfWJ74Pwmc57iUUiLj2q8m7IdSI1d-tRIO-HefVLfCzP0tBbrTEeA9eEmyFXpVgXx0JJVKPHdH7blHN1sLW4lDK0au9p46JqjJ2yMDPpA401AQSiQfI-54mhy6Guyl1Sldp';
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
