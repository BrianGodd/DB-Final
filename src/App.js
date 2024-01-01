import React, { useState } from 'react';
import MusicSearch from './components/MusicSearch';
import SpotifyPlayerComponent from './components/SpotifyPlayer';
import { ConfigProvider, Space } from 'antd';
import './App.css';

function App() {

  const [spotifyUri, setSpotifyUri] = useState('');

  const handleSearch = (uri) => {
    setSpotifyUri(uri);
  };

  return (
    <div className="App">
      <p style={{position: 'absolute', top: '10px', left: '700px'}}>Update at 20240102</p>
      
      <div> <br/><br/> </div>
      <div>
      <h1>Music App</h1>
      <MusicSearch onSearch={handleSearch} />
      {/* {<SpotifyPlayerComponent uri={spotifyUri} />} */}
      </div>
      
    </div>   
  );
}

export default App;
