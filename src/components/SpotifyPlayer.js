// src/components/SpotifyPlayer.js
import React, { useState } from 'react';
import { Button, Flex } from 'antd';
import './SpotifyPlayer.css';

const SpotifyPlayerComponent = ({uri, guess }) => {
  
  function convertToEmbedURL(originalURL) {
    // Extract the track ID from the original Spotify URL
    const match = originalURL.match(/\/track\/([^?]+)/);
    if (match && match[1]) {
      const trackId = match[1];
      // Construct the embed URL
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&autoplay=true`;
    } else {
      // Invalid URL format
      return null;
    }
  }

  const embedURL = convertToEmbedURL(uri);

  return (
    <div className="spotify-container">
      {embedURL && (
        <>
          {guess && <div className="black-overlay"></div>}

          {/* Customized content inside the iframe */}
          <iframe
            style={{ borderRadius: '12px' , marginLeft: (guess)? '-85%': '0%'}}
            src={embedURL}
            width="380"
            height= {(guess)? "100":"352"} //100
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
          ></iframe>

          <div> <br/><br/> </div>
          {!guess &&
            <div>
          <Button type="primary">
            <a href={uri} target="_blank" rel="noopener noreferrer">
              Open on Spotify
            </a>
          </Button>
          </div>
          }
        </>
      )}
    </div>
  );
};

export default SpotifyPlayerComponent;