import React, { useState } from 'react';
import { Slider } from 'antd'; // 使用 antd 的 Slider，你也可以用原生 <input type="range" />

const VolumeControl = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(50); // 0–100，對應 0–1 的實際音量

  const handleChange = (value) => {
    setVolume(value);
    if (onVolumeChange) {
      onVolumeChange(value / 100); // 轉換成 0~1
    }
  };

  return (
    <div style={{ padding: '10px', width: '200px' }}>
      <div style={{ marginBottom: '5px' }}>🔊 音量：{volume}%</div>
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={handleChange}
      />
    </div>
  );
};

export default VolumeControl;
