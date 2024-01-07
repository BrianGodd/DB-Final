// UserData.js
import axios from 'axios';
let username = '';
let nickname = '';
let spotifyToken = '';

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
      const data = 'grant_type=client_credentials';
      
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
  

export { username, nickname, spotifyToken, UpdateName, UpdateToken};
