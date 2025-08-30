import React, { createContext, useState } from 'react';

export const SignedUpGamesContext = createContext({
  signedUpGames: [],
  addSignedUpGame: () => {},
});

export function SignedUpGamesProvider({ children }) {
  const [signedUpGames, setSignedUpGames] = useState([]);
  const addSignedUpGame = (game) => {
    setSignedUpGames(prev => [...prev, game]);
  };
  return (
    <SignedUpGamesContext.Provider value={{ signedUpGames, addSignedUpGame }}>
      {children}
    </SignedUpGamesContext.Provider>
  );
}