import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';
import SongInfoComponent from './SongInfo';
import { Button, Flex , Radio, Spin, Input } from 'antd';
import { spotifyToken, UpdateUris } from './UserData';

const MusicSearch = ({ onSearch }) => {
  const [searchAnime, setSearchAnime] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchArtist, setsearchArtist] = useState('');
  const [searchAlbum, setSearchAlbum] = useState('');
  const [animeName, setAnimeName] = useState('');
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
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
  const [songs, setSongs] = useState(Array(0).fill({ TrackInfo }));

  const SearchAnim = async () => {
    let query = searchAnime;
    const market = '';

    try {
      const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=playlist${market}`,//&market=ES
        headers: {
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      
      console.log(`https://api.spotify.com/v1/search?q=${query}&type=playlist${market}`);
      const response = await axios(options);
  
      if (response.data.playlists && response.data.playlists.items && response.data.playlists.items.length > 0) 
      {
        const playlist_id = response.data.playlists.items[0].id;
        console.log(response.data.playlists.items[0].id);

        try {
          const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${playlist_id}`,//&market=ES
            headers: {
              'Authorization': `Bearer ${key}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          };
          
          console.log(`https://api.spotify.com/v1/playlists/${playlist_id}`);
          const response = await axios(options); 
          console.log(response.data.tracks.items);
      
          if (response.data.tracks && response.data.tracks.items && response.data.tracks.items.length > 0) { 
            
            const track = response.data.tracks.items; 
            setSongs( 
              track.map((songData, index) => ({ 
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
          }else {
            console.log('No results found.');
          }
        } catch (error) {
          console.error('Error searching Spotify:', error);
        };
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    };
  };

  const SearchSong = async () => {
    setLoading(true);
    setSearchSpotify(false);
    //console.log((guessDB)? 0:1);
    try {
      const response = await axios.get('http://localhost:8080/api/data/query_search_song', {
        params: {
          song: searchName,
          artist: searchArtist,
          album: searchAlbum
          //status: (guessDB)? 0:1
        }
      });
  
      /*console.log(response.data[0].track_id);
      setID(response.data[0].track_id);
      setTrack_Name(response.data[0].track_name);
      setTrack_Artist(response.data[0].artist_name);
      setTrack_Album(response.data[0].album_name);
      setTrack_Num(response.data[0].track_number);
      setTrack_Popularity(response.data[0].popularity);
      setTrack_Time(Math.round(parseInt(response.data[0].duration_ms)/1000));
      setTrack_Year((response.data[0].year).toString().split("T")[0]);
      setSongName("");
      setArtistName("");
      setAlbumName("");*/

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
      setSearchSpotify(true);
      searchBySpotify();
      console.error('Error fetching data', error);
    }finally {
      setLoading(false);
    }
  };

  const searchBySpotify = async () => {
    let query = '';
    //if(!guess)
    //{
      if(songName) query = `track:${encodeURIComponent(songName)}`;
      
      if (artistName) {
        if(songName) query += ` artist:${encodeURIComponent(artistName)}`;
        else query += `artist:${encodeURIComponent(artistName)}`;
      }
      
      if (albumName) {
        if(songName || artistName) query += ` album:${encodeURIComponent(albumName)}`;
        else query += `album:${encodeURIComponent(albumName)}`;
      }
    //}
    /*else
    {
      query = `artist:yoasobi`;//genre:j-pop year:2023
    }*/
  
    const token = key;
    const market = '';

    try {
      const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=track${market}`,//&market=ES
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      
      console.log(`https://api.spotify.com/v1/search?q=${query}&type=track${market}`);
      const response = await axios(options);
  
      if (response.data.tracks && response.data.tracks.items && response.data.tracks.items.length > 0) {
        //const filteredTracks = response.data.tracks.items.filter(track => track.popularity >= 20);
        //const ind = Math.floor(Math.random() * filteredTracks.length);
        /*
        let track = (guess)? filteredTracks[ind]:response.data.tracks.items[0];
        setID(track.id);
        setTrack_Name(track.name);
        setTrack_Artist(track.artists.map(artist => artist.name).join(" / "));
        setTrack_Album(track.album.name);
        setTrack_Num(track.track_number);
        setTrack_Popularity(track.popularity);
        setTrack_Time(Math.round(parseInt(track.duration_ms)/1000));
        setTrack_Year((track.album.release_date.split("T")[0]).toString());

        setTrackName(track.name);*/

        const track = response.data.tracks.items;
        console.log(searchArtist);
        setSongs(
          track.slice(0, 10).map((songData, index) => ({
            id: songData.id,
            Album_id: (searchAlbum != "")?songData.album.id :"",
            Artist_id: (searchArtist != "")?songData.artists.id :"",
            track_Name: songData.name,
            track_Artist: songData.artists.map(artist => artist.name).join(" / "),
            track_Album: songData.album.name,
            track_Num: songData.track_number,
            track_Popularity: songData.popularity,
            track_Time: Math.round(parseInt(songData.duration_ms) / 1000),
            track_Year: (songData.album.release_date.split("T")[0]).toString(),
          })));
          console.log(songs[0].Artist_id);
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    };
  };

  const handleSearch = async () => {
    setSearchName(songName);
    setsearchArtist(artistName);
    setSearchAlbum(albumName);
    setSearchAnime(animeName);
    //fetchData();
    //console.log(spotifyUri);
  };

  useEffect(() => {
    // This effect will run whenever spotifyUri is updated
    setSpotifyUri(`https://open.spotify.com/track/${id}?si=f85f4b06e1f54cb8`);
    setSpotifyVUri(`https://open.spotify.com/track/${id}?utm_source=generator`);
  }, [spotifyUri, spotifyVUri, id]);

  useEffect(() => {
    // This effect will run whenever searchName changes
    if(searchName == '' && searchArtist == '' && searchAlbum == '' && animeName == '') return;
    if(searchAnime) SearchAnim();
    else SearchSong();
  }, [searchName, searchArtist, searchAlbum, searchAnime]);

  const PlaySongs = async () => {
    //UpdateUris(['3J99JXowSczha1Cp0LtFoc']);
    const ids = songs.map(song => song.id);
    UpdateUris(ids);
  }

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
      <Input
        type="text"
        placeholder="Song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        style={{ width: '150px' , marginRight: '2%'}}
      />

      <Input
        type="text"
        placeholder="Artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        style={{ width: '150px' , marginRight: '2%'}}
      />

      <Input
        type="text"
        placeholder="Album name"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        style={{ width: '150px' , marginRight: '2%'}}
      />
      <Button style={{ marginBottom: '15px' , marginTop: '50px',  background: '#FF5733', color: 'white'}} type="primary" onClick={handleSearch}>
          Search
        </Button>
      <p></p>
      <Input
        type="text"
        placeholder="Anime name"
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
        style={{ width: '150px' , marginRight: '7.5%'}}
      />
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
            {(songs.length > 0)? (
            <Button style={{ marginBottom: '15px' , marginTop: '50px',  background: '#FF5733', color: 'white'}} type="primary" onClick={PlaySongs}>
              PlayAll
            </Button>):null
            }
            {searchSpotify? (
              <>
                  <p > ಥ⌣ಥ 無搜尋結果 ಥ⌣ಥ</p>
                  <p>-----------------------------------------Spotify推薦結果如下-----------------------------------------</p>
                  <p ></p>
              </>
            )
            :<p ></p>
            }
            {(songs.length != 0)? renderSongs():null}
          </>
        )
        }
      </div>
      
      <p></p>
    </div>
  );
};

export default MusicSearch;
// let openingSongs = [], endingSongs = [];
    // try {
    //   const response = await axios.get('https://api.jikan.moe/v4/anime/1735/themes');
    //   const openings = response.data.data.openings;
    //   console.log( response.data.data.openings);
    //     openingSongs = await Promise.all(openings.slice(0, 10).map(async (opening, index) => {
    //     const regex = /"([^"]+)" by ([^(]+)/;
    //     const matches = opening.match(regex);
    //     const songTitle = matches ? matches[1] : null;
    //     const artistName = matches ? matches[2] : null;
  
    //     try {
    //       const options = {
    //         method: 'GET',
    //         url: `https://api.spotify.com/v1/search?q=${songTitle}&type=track%2Cartist&market=JP`,//%2C${artistName}
    //         headers: {
    //           'Authorization': `Bearer ${key}`,
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //       };
  
    //       const sresponse = await axios(options);
    //       const sres = sresponse.data.tracks.items[index];
  
    //       return {
    //         id: sres.id,
    //         Album_id: (searchAlbum != "") ? sres.album.id : "",
    //         Artist_id: (searchArtist != "") ? sres.artists.id : "",
    //         track_Name: sres.name,
    //         track_Artist: sres.artists.map(artist => artist.name).join(" / "),
    //         track_Album: sres.album.name,
    //         track_Num: sres.track_number,
    //         track_Popularity: sres.popularity,
    //         track_Time: Math.round(parseInt(sres.duration_ms) / 1000),
    //         track_Year: (sres.album.release_date.split("T")[0]).toString(),
    //       };
    //     } catch (error) {
    //       console.error('Error searching Spotify:', error);
    //     }
    //   }));
  
    //   setSongs(openingSongs);
  
    // } catch (error) {
    //   console.error('Error fetching data', error);
    // }
