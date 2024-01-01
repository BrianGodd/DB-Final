// src/components/SpotifyPlayer.js
import React, { useState } from 'react';
import { Button, Flex } from 'antd';

const SpotifyPlayerComponent = ({uri}) => {
  
  function convertToEmbedURL(originalURL) {
    // Extract the track ID from the original Spotify URL
    const match = originalURL.match(/\/track\/([^?]+)/);
    if (match && match[1]) {
      const trackId = match[1];
      // Construct the embed URL
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    } else {
      // Invalid URL format
      return null;
    }
  }

  const embedURL = convertToEmbedURL(uri);

  return (
    <div>
      
      <div> <br/><br/> </div>
      <iframe
        style={{ borderRadius: '12px' }}
        src={embedURL}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <Button type="primary"><a href={uri} target="_blank" rel="noopener noreferrer">
        Open on Spotify
      </a></Button>
      
    </div>
  );
};

export default SpotifyPlayerComponent;