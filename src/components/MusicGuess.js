import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';
import SongInfoComponent from './SongInfo';
import { Button, Flex , Radio, Spin, Input , Card, Select } from 'antd';
import { nickname, spotifyToken } from './UserData';

const MusicGuess = ({ onSearch }) => {
  const [animeName, setAnimeName] = useState('');
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [key, setKey] = useState(spotifyToken);
  const [guess, setGuess] = useState(false);
  const [guessDB, setGuessDB] = useState(false);
  const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8');
  const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator");

  const [trackName, setTrackName] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchSpotify, setSearchSpotify] = useState(false);
  const [startGuess, setStartGuess] = useState(false);

  const [numQuestions, setNumQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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

  const GuessAnim = async () => {
    let query = animeName;
    const market = '';
  
    try {
      const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${query}&type=playlist${market}`,
        headers: {
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
  
      console.log(`https://api.spotify.com/v1/search?q=${query}&type=playlist${market}`);
      const response = await axios(options);
  
      if (response.data.playlists && response.data.playlists.items && response.data.playlists.items.length > 0) {
        const playlist_id = response.data.playlists.items[0].id;
        console.log(response.data.playlists.items[0].id);
  
        try {
          const playlistOptions = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${playlist_id}`,
            headers: {
              'Authorization': `Bearer ${key}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          };
  
          console.log(`https://api.spotify.com/v1/playlists/${playlist_id}`);
          const playlistResponse = await axios(playlistOptions);
          console.log(playlistResponse.data.tracks.items);
  
          if (playlistResponse.data.tracks && playlistResponse.data.tracks.items && playlistResponse.data.tracks.items.length > 0) {
            const tracks = playlistResponse.data.tracks.items;
            console.log(tracks[0].track.id);
            
            for (let i = tracks.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
            }
            console.log(tracks[0].track.id);
  
            // Take the first four tracks
            const selectedTracks = tracks.slice(0, 4);
            console.log(selectedTracks[0].track.id);
  
            setSongs(
              selectedTracks.map((songData, index) => ({
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
              }))
            );
            console.log(songs);
          } else {
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
  
  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
    return array;
  };

  const GuessSong = async () => {
    setLoading(true);
    console.log((guessDB)? 0:1);
    console.log(artistName);
    try {
      const response = await axios.get('http://localhost:8080/api/data/query_guess_song', {
        params: {
          song: songName,
          artist: artistName,
          album: albumName
        }
      });

      setSongs(
        response.data.slice(0, 4).map((songData, index) => ({
          id: songData.track_id,
          Album_id: "",
          Artist_id: "",
          track_Name: songData.track_name,
          track_Artist: songData.artist_name,
          track_Album: songData.album_name,
          track_Num: songData.track_number,
          track_Popularity: songData.popularity,
          track_Time: Math.round(parseInt(songData.duration_ms) / 1000),
          track_Year: (songData.year && songData.year.toString().split('T')[0]) || '',
        }))
      );

      /*const optionsData = [];
      const randomAns = Math.floor(Math.random() * 4);
      setID(songs[randomAns].id);
      setTrack_Name(songs[randomAns].track_Name);
      setTrack_Artist(songs[randomAns].track_Artist);
      setTrack_Album(songs[randomAns].track_Album);
      setTrack_Num(songs[randomAns].track_Num);
      setTrack_Popularity(songs[randomAns].track_Popularity);
      setTrack_Time(songs[randomAns].track_Time);
      setTrack_Year(songs[randomAns].track_Year);
      console.log("ans:" + randomAns);
      console.log(songs[randomAns].track_Name);

      for(let i = 0;i<4;i++) optionsData.push(songs[i].track_Name);

      for (let i = optionsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsData[i], optionsData[j]] = [optionsData[j], optionsData[i]];
      }

      setOptions(optionsData);*/
    } catch (error) {
      console.error('Error fetching data', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(guessDB || (guess && animeName))
    {
      const optionsData = [];
      const randomAns = Math.floor(Math.random() * 4);
    
      setID(songs[randomAns].id);
      setTrack_Name(songs[randomAns].track_Name);
      setTrack_Artist(songs[randomAns].track_Artist);
      setTrack_Album(songs[randomAns].track_Album);
      setTrack_Num(songs[randomAns].track_Num);
      setTrack_Popularity(songs[randomAns].track_Popularity);
      setTrack_Time(songs[randomAns].track_Time);
      setTrack_Year(songs[randomAns].track_Year);
      setTrackName(songs[randomAns].track_Name);
      console.log("ans:" + randomAns);
      console.log(songs[randomAns].track_Name);
    
      for (let i = 0; i < 4; i++) optionsData.push(songs[i].track_Name);
    
      for (let i = optionsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsData[i], optionsData[j]] = [optionsData[j], optionsData[i]];
      }
    
      setOptions(optionsData);
    }
  }, [songs]);

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
  
    const token = key//'BQC6vssIEWTaZ1MZHQeSMA56hacecrKORTSIpzAXqUJFsQeQywnMtAUo27aLDfJEyKgb8xH9uj3XZ35wuPKxZQaqaJ1jwJFJXohJa9FEHpgPa9IFNHHxkq2_7vceTYi-bOsePTLm1BwCfKlPNDOKxKr-wybi0qfmotN71oMloKyL9PGUP3ZIUpqPiBvvNEq5AmzFwTaAJmdfR3Me';
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
        const filteredTracks = response.data.tracks.items.filter(track => track.popularity >= 20);
        const ind = Math.floor(Math.random() * filteredTracks.length);
        let track = (guess)? filteredTracks[ind]:response.data.tracks.items[0];
        setID(track.id);
        setTrack_Name(track.name);
        setTrack_Artist(track.artists.map(artist => artist.name).join(" / "));
        setTrack_Album(track.album.name);
        setTrack_Num(track.track_number);
        setTrack_Popularity(track.popularity);
        setTrack_Time(Math.round(parseInt(track.duration_ms)/1000));
        setTrack_Year((track.album.release_date.split("T")[0]).toString());

        setTrackName(track.name);
        if(!guess)
        {
          //setSongName("");
          //setArtistName("");
          //setAlbumName("");
        }
        if(guess)
        {
          const optionsData = [];

          // Get three random indices without repetition
          const randomIndices = [];
          while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredTracks.length);
            if (!randomIndices.includes(randomIndex) && filteredTracks[randomIndex].name != track.name) {
              randomIndices.push(randomIndex);
            }
          }

          // Add the names corresponding to the random indices
          randomIndices.forEach(index => {
            console.log(index);
            optionsData.push(filteredTracks[index].name);
          });

          // Add the actual track name
          optionsData.push(track.name);

          // Shuffle the optionsData array
          for (let i = optionsData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsData[i], optionsData[j]] = [optionsData[j], optionsData[i]];
          }

          setOptions(optionsData);
        }
        console.log(track);

        track = response.data.tracks.items;
        setSongs(
          track.slice(0, 10).map((songData, index) => ({
            id: songData.id,
            Album_id: (albumName != "")?songData.album.id :"",
            Artist_id: (artistName != "")?songData.artists.id :"",
            track_Name: songData.name,
            track_Artist: songData.artists.map(artist => artist.name).join(" / "),
            track_Album: songData.album.name,
            track_Num: songData.track_number,
            track_Popularity: songData.popularity,
            track_Time: Math.round(parseInt(songData.duration_ms) / 1000),
            track_Year: (songData.album.release_date.split("T")[0]).toString(),
          })));
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Spotify:', error);
    };
  };

  const setGuessFunc = async () => {
    setCurrentQuestion(1);
    setQuizEnded(false);
    setStartGuess(true);
    setCorrectAnswers(0);
    if(guess)
    {
      setGuess(false);
    }
    else
    {
      setGuess(true);
      setGuessDB(false);
    }
  };

  const setGuessDBFunc = async () => {
    setCurrentQuestion(1);
    setQuizEnded(false);
    setStartGuess(true);
    setCorrectAnswers(0);
    if(guessDB)
    {
      setGuessDB(false);
    }
    else
    {
      setGuessDB(true);
      setGuess(false);
    }
  };

  const handleNextQuestion = () => {
    const questions = parseInt(numQuestions, 10);
    if (currentQuestion < numQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
      setAnswerStatus(null);
  
      if (guessDB) {
        GuessSong();
      } else if (animeName) {
        GuessAnim();
      } else {
        searchBySpotify();
      }
    } else {
      setQuizEnded(true);
    }
  };

  const handleEndGuess = () => {
    setGuess(false);
    setGuessDB(false);
    setAnswered(false);
    setAnswerStatus(null);
    setStartGuess(false);
  };

  useEffect(() => {
    // This effect will run whenever spotifyUri is updated
    setSpotifyUri(`https://open.spotify.com/track/${id}?si=f85f4b06e1f54cb8`);
    setSpotifyVUri(`https://open.spotify.com/track/${id}?utm_source=generator`);
  }, [spotifyUri, spotifyVUri, id]);

  useEffect(() => {
    // This effect will run whenever guess changes
    if(animeName)
    {
      GuessAnim();
      return;
    }
    if (guess) {
      setAnswered(false);
      searchBySpotify();
    }
    else if(guessDB)
    {
      GuessSong();
    }
  }, [guess, guessDB]);

  useEffect(() => {
    // Update options when guess is true
    //if (guess) {
      // Fetch options logic
      // Assume that optionsData is an array of track names
      setSelectedOption(null);
      setAnswerStatus(null);
    //}
  }, [guess, guessDB]);

  useEffect(() => {
    setAnswered(false);
  }, [guess, guessDB]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    // Compare the selected option with the actual track name
    // Assume actualTrackName is the actual track name from Spotify
    if(currentQuestion >= numQuestions) setQuizEnded(true);
    const actualTrackName = trackName; // Replace this with the actual track name
    if (selectedOption === actualTrackName) {
      setAnswerStatus('恭喜答對');
      setCorrectAnswers(correctAnswers+1);
    } else {
      setAnswerStatus(`正確答案：${actualTrackName}`);
    }
    setAnswered(true);
  };

  const renderSongs = () => {
    return songs.map((song, index) => (
      <div>
        <div>
          <hr style={{ width: '100%', margin: '20px 0' }} />
        </div>
        <div key={index} style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginRight: '-15px' }}></div>
          <SpotifyPlayerComponent uri={`https://open.spotify.com/track/${song.id}`} guess={(guess || guessDB) && !answered} />
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

  const renderGuest = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginRight: '-15px' }}></div>
        <SpotifyPlayerComponent uri={spotifyUri} guess={(guess || guessDB) && !answered} />
        <div style={{ marginRight: '10px' }}></div>
        {((!guess && !guessDB) || answered)?
        <SongInfoComponent
          song_name={track_Name}
          artist_name={track_Artist}
          album_name={track_Album}
          track_num={track_Num}
          popularity={track_Popularity}
          time={track_Time}
          year={track_Year}
          song_id={id}
          artist_id={""}
          album_id={""}
        />: null}
      </div>
    );
  };
  
  

  return (
    <div>
      {(!guess && !guessDB) && <div>
        <p style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>輸入(同一)歌名/歌手/專輯下猜歌</p>
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
          style={{ width: '150px' , marginRight: '0%'}}
        />

        <Input
          type="text"
          placeholder="Album name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          style={{ width: '150px' , marginLeft: '2%'}}
        />
        <p style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>輸入動漫名稱猜歌</p>
        <Input
          type="text"
          placeholder="Anime name"
          value={animeName}
          onChange={(e) => setAnimeName(e.target.value)}
          style={{ width: '150px' , marginRight: '0%'}}
        />
        <p></p>
        <hr style={{ width: '100%', margin: '20px 0' }} /> 
        <p style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>選擇猜歌來源、開始猜歌囉!</p>
        <div>
          <Button style={{ marginBottom: '15px' , marginTop: '10px', marginRight: '5%',  background: '#FF5733', color: 'white'}} type="primary" size="large" onClick={setGuessFunc}>
            Guess from Spotify
          </Button>
          <Button style={{ marginBottom: '15px' , marginTop: '10px', background: '#FF5733', color: 'white'}} type="primary" size="large" onClick={setGuessDBFunc}>
            Guess from DB
          </Button>
        </div>
        <hr style={{ width: '100%', margin: '20px 0' }} /> 
        <p style={{ textAlign: 'center' , fontWeight: 'bold', fontSize: '24px'}}>題數(預設5題)</p>
        <Select
          defaultValue="5"
          onChange={(value) => setNumQuestions(value)}
          style={{ width: 120, marginRight: '10px' }}
        >
          <Select.Option value="5">5 題</Select.Option>
          <Select.Option value="10">10 題</Select.Option>
          <Select.Option value="20">20 題</Select.Option>
        </Select>
        </div>}
      <div>
        {(answerStatus && quizEnded)?
                  (
                    <Card
                      title="恭喜!"
                      style={{
                        width: '300px',
                        margin: 'auto', // Center the card horizontally
                        marginBottom: '2%',
                        background: 'linear-gradient(to right, #FF5733, #FFB64D)', // Gradient background for the card
                      }}
                      headStyle={{
                        background: 'linear-gradient(to right, #FF5733, #FFB64D)', // Gradient background for the title area
                        color: 'white', // Text color for the title
                      }}
                      bodyStyle={{
                        color: 'white', // Text color for the body
                      }}
                    >
                      <p>
                        {nickname} 答對了 {correctAnswers} 題!
                      </p>
                    </Card>
                  ):null}
        {(guess || guessDB) && (
          <div>
            <Card
              title={<p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
              第 {currentQuestion} 題 / 共 {numQuestions} 題
            </p>}
              style={{
                width: '200px',
                margin: 'auto', // Center the card horizontally
                overflow: 'hidden', // Prevent gradient overflow
              }}
              headStyle={{
                background: 'linear-gradient(to right, #ff9966, #ff5e62)', // Gradient background for the title area
                color: 'white', // Text color for the title
              }}
            >
              <Radio.Group
                onChange={handleOptionChange}
                value={selectedOption}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {options.map((option, index) => (
                  <Radio key={index} value={option} style={{ marginBottom: '8px' }}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Card>
            <p></p>
            {!answerStatus && (
            <Button style={{ marginRight: '10px' }} type="primary" onClick={handleSubmit}>
              送出
            </Button>
            )}
            {answerStatus && <Card
              title="Answer"
              style={{ width: 300, margin: '16px auto', textAlign: 'center' }}
              headStyle={{ background: 'linear-gradient(to right, #ff9966, #ff5e62)', color: 'white' }}
            >
              {answerStatus}
            </Card>}
            {answerStatus && (
              <>
                {(!quizEnded)?
                (<Button style={{ marginRight: '10px' }} type="primary" onClick={handleNextQuestion}>
                  下一題
                </Button>):null}
                <Button
                  style={{ marginRight: '10px', background: 'grey' , color: 'white' }}
                  type="primary"
                  onClick={handleEndGuess}
                >
                  結束猜題
                </Button>
            </>
            )}
          </div>
        )}
        </div>
        <div style={{ marginTop: (loading)? '20px': '0px'}}>
            {startGuess?
            (
                <div>
                {loading ? (
                <>
                <p> 請稍候，資料載入中...</p>
                <Spin size="large" />
                </>
                ) :
                (
                <>
                    {searchSpotify? (
                    <>
                        <p > ಥ⌣ಥ 無搜尋結果 ಥ⌣ಥ</p>
                        <p>-----------------------------------------Spotify推薦結果如下-----------------------------------------</p>
                        <p ></p>
                    </>
                    )
                    :<p ></p>
                    }
                    {(guess || guessDB) && renderGuest()}
                    {(!guess && !guessDB) && renderSongs()}
                </>
                )
                }
                </div>
            ):null}
      </div>
      
      <p></p>
    </div>
  );
};

export default MusicGuess;

/*
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ marginRight: '-15px' }}></div>
              <SpotifyPlayerComponent uri={spotifyUri} guess={(guess || guessDB) && !answered} />
              <div style={{ marginRight: '10px' }}></div>
              <SongInfoComponent 
                song_name = {track_Name} 
                artist_name = {track_Artist}
                album_name = {track_Album}
                track_num = {track_Num}
                popularity = {track_Popularity}
                time = {track_Time}
                year={track_Year} 
              guess={(guess || guessDB) && !answered} />
            </div>
            */
