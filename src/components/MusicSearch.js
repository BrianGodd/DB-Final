import React, { useState , useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayerComponent from './SpotifyPlayer';
import { Button, Flex , Radio} from 'antd';

const MusicSearch = ({ onSearch }) => {
  const [searchName, setSearchName] = useState('All I Want for Christmas Is You');
  const [searchArtist, setsearchArtist] = useState('Mariah Carey');
  const [searchAlbum, setSearchAlbum] = useState('Merry Christmas');
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [key, setKey] = useState('BQAoSjaFR0zivcIwMvAvcBzTCGoXVFcgyAmCyI3fN59eFvZEDzZ38OoiTdqBiJmOr4kKsPLXp9RLYdHYFrqhn11rpppzAGrl-bzhG26-CjQvpEibnMCXkQv3faSXuPq7wjCqj2F0cO6fgJsX46ETa-Gh_Sg9J1KfVm5ujpqD2KJ5yDVEhb9VlB0-08X3esLR5ikKZqdqpbuOWEJK');
  const [guess, setGuess] = useState(false);
  const [guessDB, setGuessDB] = useState(false);
  const [id, setID] = useState('0YTM7bCx451c6LQbkddy4Q');
  const [spotifyUri, setSpotifyUri] = useState('https://open.spotify.com/track/0YTM7bCx451c6LQbkddy4Q?si=f85f4b06e1f54cb8');
  const [spotifyVUri, setSpotifyVUri] = useState("https://open.spotify.com/embed/track/0YTM7bCx451c6LQbkddy4Q?utm_source=generator");

  const [trackName, setTrackName] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answered, setAnswered] = useState(false);

  const fetchData = async () => {
    console.log((guessDB)? 0:1);
    try {
      const response = await axios.get('http://localhost:8080/api/data', {
        params: {
          songName: searchName,
          songArtist: searchArtist,
          songAlbum: searchAlbum,
          status: (guessDB)? 0:1
        }
      });
  
      console.log(response.data[0].track_id);
      setID(response.data[0].track_id);
      setSongName("");
      setArtistName("");
      setAlbumName("");
    } catch (error) {
      searchBySpotify();
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    // This effect will run whenever spotifyUri is updated
    setSpotifyUri(`https://open.spotify.com/track/${id}?si=f85f4b06e1f54cb8`);
    setSpotifyVUri(`https://open.spotify.com/track/${id}?utm_source=generator`);
  }, [spotifyUri, spotifyVUri, id]);

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
        const track = (guess)? filteredTracks[ind]:response.data.tracks.items[0];
        setID(track.id);
        setTrackName(track.name);
        if(!guess)
        {
          setSongName("");
          setArtistName("");
          setAlbumName("");
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
    //fetchData();
    //console.log(spotifyUri);
  };

  const setGuessFunc = async () => {
    if(guess)
    {
      setGuess(false);
    }
    else
    {
      setGuess(true);
    }
  };

  const setGuessDBFunc = async () => {
    if(guessDB)
    {
      setGuessDB(false);
    }
    else
    {
      setGuessDB(true);
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    setAnswerStatus(null); 
    searchBySpotify();
  };

  const handleEndGuess = () => {
    setGuess(false);
    setGuessDB(false);
    setAnswered(false);
    setAnswerStatus(null);
  };

  useEffect(() => {
    // This effect will run whenever searchName changes
    fetchData();
  }, [searchName, searchArtist, searchAlbum]);

  useEffect(() => {
    // This effect will run whenever guess changes
    if (guess) {
      setAnswered(false);
      searchBySpotify();
    }
    else if(guessDB)
    {
      fetchData();
    }
  }, [guess, guessDB]);

  useEffect(() => {
    // Update options when guess is true
    if (guess) {
      // Fetch options logic
      // Assume that optionsData is an array of track names
      setSelectedOption(null);
      setAnswerStatus(null);
    }
  }, [guess]);

  useEffect(() => {
    setAnswered(false);
  }, [guess]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    // Compare the selected option with the actual track name
    // Assume actualTrackName is the actual track name from Spotify
    const actualTrackName = trackName; // Replace this with the actual track name
    if (selectedOption === actualTrackName) {
      setAnswerStatus('恭喜答對');
    } else {
      setAnswerStatus(`正確答案：${actualTrackName}`);
    }
    setAnswered(true);
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
      <Button style={{ marginRight: '10px' }} type="primary" onClick={setGuessFunc}>Guess from Spotify</Button>
      <Button type="primary" onClick={setGuessDBFunc}>Guess from DB</Button>
      <div>
        {guess && (
          <div>
            <Radio.Group onChange={handleOptionChange} value={selectedOption}>
              {options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
            <p></p>
            <Button style={{ marginRight: '10px' }} type="primary" onClick={handleSubmit}>
              送出
            </Button>
            {answerStatus && <p>{answerStatus}</p>}
            {answerStatus && (
              <>
                <Button style={{ marginRight: '10px' }} type="primary" onClick={handleNextQuestion}>
                  下一題
                </Button>
                <Button style={{ marginRight: '10px' }} type="primary" onClick={handleEndGuess}>
                  結束猜題
                </Button>
            </>
            )}
          </div>
        )}
        </div>
      {<SpotifyPlayerComponent uri={spotifyUri} guess={(guess || guessDB) && !answered} />}
      
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

export default MusicSearch;
