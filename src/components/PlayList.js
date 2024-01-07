import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';
import SongInfoComponent from './SongInfo';
import { Button, Flex , Radio, Spin } from 'antd';
import { username, nickname } from './UserData';
import { spotifyToken } from './UserData';

const PlayList = ({ onSearch }) => {
  const [searchName, setSearchName] = useState('All I Want for Christmas Is You');
  const [searchArtist, setsearchArtist] = useState('Mariah Carey');
  const [searchAlbum, setSearchAlbum] = useState('Merry Christmas');
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [key, setKey] = useState(spotifyToken);
  const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8');
  const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator");

  const [loading, setLoading] = useState(false);
  const [listlen, setListlen] = useState(0);

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
    addTime: ''
  };
  const [songs, setSongs] = useState(Array(10).fill({ TrackInfo }));

  const SearchSong = async () => {
    setLoading(true);
    //console.log((guessDB)? 0:1);
    try {
      const response = await axios.get('http://localhost:8080/api/data/query_gain_songlist', {
        params: {
          current_name: username,
        }
      });

      setListlen(response.data.length);
      console.log(response.data.length);
      //改為陣列版本
      if(response.data.length > 0)
      {
        setSongs(
          response.data.map((songData, index) => ({
            id: songData.track_id,
            addTime: songData.add_time
          })));
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

  useEffect(() => {
    SearchSong();
  }, []);

  const renderSongs = (listlen) => {
    // Sort the songs based on the addTime in descending order
    const sortedSongs = songs.sort((a, b) => {
      const dateA = new Date(a.addTime);
      const dateB = new Date(b.addTime);
      return dateB - dateA;
    });
    if(listlen == 0) return(<div style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>無</div>);
    
    return Array.from({ length: listlen }, (_, index) => (
      <div key={index}>
        <div> 
           <hr style={{ width: '100%', margin: '20px 0' }} /> 
         </div> 
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginRight: '-15px' }}></div>
          {/* Use sortedSongs[index] instead of songs[index] */}
          <SpotifyPlayerComponent uri={`https://open.spotify.com/track/${sortedSongs[index].id}`} guess={false} />
          <div> <br/><br/> </div>
        </div>
      </div>
    ));
  };

  return (
    <div> 
      <p></p>
      <div>
        </div>
        <div style={{ marginTop: (loading)? '20px': '0px'}}>
        {loading ? (
        <>
          <div style={{ alignItems: 'center'}}>
            <p> 請稍候，資料載入中...</p>
            <Spin size="large" />
          </div>
        </>
        ) :
        (
          <>
            <p style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>-----------------------------------------你的歌單-----------------------------------------</p>
            {renderSongs(listlen)}
          </>
        )
        }
      </div>
      
      <p></p>
    </div>
  );
};

export default PlayList;
