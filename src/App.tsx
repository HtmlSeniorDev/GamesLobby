import React from 'react';
import GamesPage from '@src/pages/Games/Games';
import { RootStoreProvider } from '@src/stores/StoreContext';

export function App() {
  return (
    <RootStoreProvider>
      <GamesPage />
    </RootStoreProvider>
  );
}
