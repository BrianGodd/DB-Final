import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import SpotifyPlayer from 'react-spotify-web-playback';
import { uris, setUpdateUrisCallback , spotifyPlayToken } from './UserData';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const SpotifyPlayBack = ({ onAddSongAndNextRef }) => {
  const token = 'BQDsYM8UYVSIGMObS4wWW9V1s7LPQOfBvZHQf4taDyiTItGhk8GHvepp9n1EJ2UBtS3No9nR_1q1lPp69rncfIjR_2i8iFINlcsjGUix24DeHLZNBq6IrSCoOgNLJUcXH3hm9pGseIdO_TE5Pyh2Y02_Df11AIX4GSt2pTUyDM8IjIE85RuGx762bScglM9DL8PUa3ip5-zz0zrGYv7ig90_gqecotVl';
  const [key, setKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subUris, setSubUris] = useState(['10AC3n6YglAdIpi4TUAjNZ', '5eY7692tmgHB9dbmq6wa2M']);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    console.log("uris:", uris);
  }, [uris]);

  const handleAddSongAndNext = async (uris, newListLength) => {
    setCurrentIndex(uris.length - newListLength);
    const newSubUris = uris.slice(-newListLength);
    setSubUris(newSubUris);
    console.log(newListLength);
    setKey(key + 1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setKey(0);
  };

  useEffect(() => {
    // 設置回調函數，當 UserData 中的 uris 更新時，執行 handleAddSongAndNext
    setUpdateUrisCallback(handleAddSongAndNext);
  }, []);

  return (
    <div style={{ position: 'absolute', top: '40%', left: !collapsed ? '93%' : '103%', transform: 'translate(-50%, -50%)', width: !collapsed ? '40%' : '20%', height: '80%' , transition: 'left 0.3s, width 0.3s',}}>
        <Button
        type="primary"
        icon={collapsed ? <MenuUnfoldOutlined style={{ transform: 'scaleX(-1)'}}/> : <MenuFoldOutlined  style={{ transform: 'scaleX(-1)'}}/>}
        onClick={() => setCollapsed(!collapsed)}
        style={{ position: 'absolute', top: '40px', left: '-35px', transform: 'translateY(-50%)' ,}}
        />
        <SpotifyPlayer
        key={key}
        token={spotifyPlayToken}
        uris={subUris.map((uri) => `spotify:track:${uri}`)}
        autoPlay={true}
        initialIndex={1}
        callback={(state) => {
            if (!state.isPlaying) {
            console.log('Song ended, handle loop logic here');
            }
        }}
        />
    </div>
    
  );
};

export default SpotifyPlayBack;