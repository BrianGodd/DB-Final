import React, { useState , useEffect } from 'react'; 
 import axios from 'axios'; 
 import SpotifyPlayerComponent from './SpotifyPlayer'; 
 import SongInfoComponent from './SongInfo'; 
 import { Button, Flex , Radio, Spin } from 'antd'; 
 import { spotifyToken } from './UserData';
  
 const RankSearch = ({ onSearch }) => { 
   const [key, setKey] = useState(spotifyToken); 
   const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8'); 
   const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator"); 
  
   const [loading, setLoading] = useState(false); 
   const [searchSpotify, setSearchSpotify] = useState(false); 
  
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
  
   const searchBySpotify = async () => { 
  
     const token = key; 
     const market = ''; 
  
     try { 
       const options = { 
         method: 'GET', 
         url: `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`,
         headers: { 
           'Authorization': `Bearer ${token}`, 
           'Accept': 'application/json', 
           'Content-Type': 'application/json', 
         }, 
       }; 
       
       const response = await axios(options); 
       console.log(response.data.tracks.items);
  
       if (response.data.tracks && response.data.tracks.items && response.data.tracks.items.length > 0) { 
        
         const track = response.data.tracks.items; 
         setSongs( 
           track.slice(0, 10).map((songData, index) => ({ 
             id: songData.track.id, 
             Album_id: songData.track.album.id, 
             Artist_id: songData.track.artists.id, 
             track_Name: songData.track.name, 
             track_Artist: songData.track.artists.map(artist => artist.name).join(" / "), 
             track_Album: songData.track.album.name, 
             track_Num: songData.track.track_number, 
             track_Popularity: songData.track.popularity, 
             track_Time: Math.round(parseInt(songData.track.duration_ms) / 1000), 
             track_Year: (songData.track.album.release_date.split("T")[0]).toString(), 
           }))); 
           console.log(songs[0].Artist_id); 
       } else { 
         console.log('No results found.'); 
       } 
     } catch (error) { 
       console.error('Error searching Spotify:', error); 
     }; 
   }; 

   useEffect(() => { 
    searchBySpotify();
  }, []); 
  
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
           <p style={{ fontWeight: 'bold', fontSize: '24px'}}>第{index+1}名</p>
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
             {renderSongs()} 
           </> 
         ) 
         } 
       </div> 
  
       <p></p>  
     </div> 
   ); 
 }; 
  
 export default RankSearch;