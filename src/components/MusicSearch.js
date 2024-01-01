import React, { useState } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';

const MusicSearch = ({ onSearch }) => {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8');
  const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=track:${songName}+artist:${artistName}+album:${albumName}&type=track`,
        {
          headers: {
            Authorization: `f64a5ad8107f4f9494ac7a24f62254ae`, // Replace with your actual access token
          },
        }
      );

      // Assuming the first track in the search results is the desired one
      const track = response.data.tracks.items[0];
      if (track) {
        const uri = track.uri;
        setSpotifyUri(uri);
        onSearch(uri);
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error
        console.error('Axios Error:', error.message);
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else {
        // Other types of errors
        console.error('Error fetching Spotify data:', error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album name"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {<SpotifyPlayerComponent uri={spotifyUri} />}
      
    </div>
  );
};

export default MusicSearch;
