import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FilterBlock from '@src/pages/Games/FilterBlock/FilterBlock';
import s from '@src/pages/Games/Games.css';
import GamesList from '@src/pages/Games/GamesList/GamesList';
import { useRootStore } from '@src/stores/StoreContext';

const Games = () => {
  const { gamesStore, gamesViewModel } = useRootStore();

  useEffect(() => {
    gamesStore.fetchGames();
    return () => {
      gamesViewModel.dispose();
    };
  }, [gamesStore]);

  return (
    <div className={s.gamesPage}>
      <Container>
        <h1 className={s.title}> Sections </h1>
        <FilterBlock />
        <h1 className={s.title}> Games </h1>
        <GamesList />
      </Container>
    </div>
  );
};

export default observer(Games);
