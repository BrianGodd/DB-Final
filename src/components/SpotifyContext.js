import React, { createContext, useContext, useState } from 'react';

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [uris, setUris] = useState(['10AC3n6YglAdIpi4TUAjNZ']);

  const updateUris = (newUris) => {
    setUris(newUris);
  };

  return (
    <SpotifyContext.Provider value={{ uris, updateUris }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};
