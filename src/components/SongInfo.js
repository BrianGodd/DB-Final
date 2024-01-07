// src/components/SongInfo.js
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import axios from 'axios';

const SongInfoComponent = ({ song_name, artist_name, album_name, track_num, popularity, time, year , song_id, artist_id, album_id}) => {
  // Convert seconds to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const UpdateFunc = async () => {
    console.log(song_id);
    console.log(album_id);
    console.log(artist_id);
    if(song_id!='') UpdateSongs();
    if(album_id!='') UpdateAlbum();
    if(artist_id!='') UpdateArtist();
  };
  
  const UpdateSongs = async () => {
    try {
      const response = await axios.post('https://7q96yl67a3.execute-api.us-east-1.amazonaws.com/cors/UpdateDB',
      {
          "operation": "UpdateByTrack",
          "id" : song_id
      });
  
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error update data', error);
    }
  };

  const UpdateAlbum = async () => {
    try {
      const response = await axios.post('https://7q96yl67a3.execute-api.us-east-1.amazonaws.com/cors/UpdateDB',
      {
          "operation": "UpdateByAlbum",
          "id" : album_id
      });
  
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error update data', error);
    }
  };

  const UpdateArtist = async () => {
    try {
      const response = await axios.post('https://7q96yl67a3.execute-api.us-east-1.amazonaws.com/cors/UpdateDB',
      {
          "operation": "UpdateByArtist",
          "id" : artist_id
      });
  
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error update data', error);
    }
  };

  return (
    <div className="SongInfoComponent" style={{ marginRight: '-50px', marginTop: '-10px'}}>
      <Card title="歌曲資訊" bordered={true} headStyle={{ backgroundColor: 'black', color: 'white' }} style={{ width: 300, backgroundColor: 'black', color: 'white' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{song_name}</p>
        <p>歌手: {artist_name}</p>
        <p>專輯: {album_name}</p>
        <p>編號: {track_num}</p>
        <p>知名度: {popularity}</p>
        <p>時間長度: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>
        <p>發表日期: {year}</p>
        <Button type="primary" onClick={UpdateFunc}>
            新增至資料庫
        </Button>
        <Button type="primary" style={{ marginLeft: '20px'}} onClick={UpdateSongs}>
            加入歌單
        </Button>
      </Card>
    </div>
  );
};

export default SongInfoComponent;
