import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';
import SongInfoComponent from './SongInfo';
import { Button, Flex , Radio, Spin } from 'antd';

const PlayList = ({ onSearch }) => {
  const [username, username] = useState('All I Want for Christmas Is You');
  const [key, setKey] = useState('BQAPFp2m1eTUJtm8JW4xE7RLmJibZwm1aWZWVJZlBi2_QXOZlETV2E9IS9BRi8a9LogI5FcC0omt-1wEP12HqEp5CEOcebXoL4FCOdQLyN1uFYUIxOyolDWkilj5xNCEk_whNI275IfcLlctnAG32UoT_-fXLHJJmP8DE8Z4LAVCVeXh1FfhZivz_S1JayUwQoEo_u9l1yoO1EJI');
  const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8');
  const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator");

  const [loading, setLoading] = useState(false);

  //搜尋結果
  const [id, setID] = useState('0YTM7bCx451c6LQbkddy4Q');
  const [track_Name, setTrack_Name] = useState('');
  const [track_Artist, setTrack_Artist] = useState('');
  const [track_Album, setTrack_Album] = useState('');
  const [track_Num, setTrack_Num] = useState(0);
  const [track_Popularity, setTrack_Popularity] = useState(0);
  const [track_Time, setTrack_Time] = useState(0);
  const [track_Year, setTrack_Year] = useState('');
  //

  //改為陣列版本
  const TrackInfo = {
    id: '',
    Album_id: '',
    Artist_id: '',
    track_Name: '',
    track_Artist: '',
    track_Album: '',
    track_Num: 0,
    track_Popularity: 0,
    track_Time: 0,
    track_Year: '',
  };
  const [songs, setSongs] = useState(Array(10).fill({ TrackInfo }));

  const SearchSong = async () => {
    setLoading(true);
    setSearchSpotify(false);
    //console.log((guessDB)? 0:1);
    try {
      const response = await axios.get('http://localhost:8080/api/data/query_gain_songlist', {
        params: {
          current_name: username,
        }
      });

      //改為陣列版本
      if(response.data.length > 0)
      {
        setSongs(
          response.data.map((songData, index) => ({
            id: songData.track_id,
            Album_id: "",
            Artist_id: "",
            track_Name: songData.track_name,
            track_Artist: songData.artist_name,
            track_Album: songData.album_name,
            track_Num: songData.track_number,
            track_Popularity: songData.popularity,
            track_Time: Math.round(parseInt(songData.duration_ms) / 1000),
            track_Year: songData.year.toString().split('T')[0],
          })));
        }
        else
        {
          setSearchSpotify(true);
          searchBySpotify();
        }
    } catch (error) {
      console.error('Error fetching data', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // This effect will run whenever spotifyUri is updated
    setSpotifyUri(`https://open.spotify.com/track/${id}?si=f85f4b06e1f54cb8`);
    setSpotifyVUri(`https://open.spotify.com/track/${id}?utm_source=generator`);
  }, [spotifyUri, spotifyVUri, id]);

  const renderSongs = () => {
    return songs.map((song, index) => (
      <div>
        <div>
          <hr style={{ width: '100%', margin: '20px 0' }} />
        </div>
        <div key={index} style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginRight: '-15px' }}></div>
          <SpotifyPlayerComponent uri={`https://open.spotify.com/track/${song.id}`} guess={false} />
          <div style={{ marginRight: '10px' }}></div>
          <div><SongInfoComponent
            song_name={song.track_Name}
            artist_name={song.track_Artist}
            album_name={song.track_Album}
            track_num={song.track_Num}
            popularity={song.track_Popularity}
            time={song.track_Time}
            year={song.track_Year}
            song_id={song.id}
            artist_id={song.Artist_id}
            album_id={song.Album_id}
          /></div>
          <div> <br/><br/> </div>
        </div>
      </div>
    ));
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
      <button onClick={handleSearch} >Search</button> 
      <p></p>
      <div>
        </div>
        <div style={{ marginTop: (loading)? '20px': '0px'}}>
        {loading ? (
        <>
          <p> 請稍候，資料載入中...</p>
          <Spin size="large" />
        </>
        ) :
        (
          <>
            <p>-----------------------------------------你的歌單-----------------------------------------</p>
            {renderSongs()}
          </>
        )
        }
      </div>
      
      <p></p>
      <input
        type="text"
        placeholder="Acess Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
    </div>
  );
};

export default PlayList;
