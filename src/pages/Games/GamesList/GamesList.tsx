import { observer } from 'mobx-react';
import React from 'react';
import { Button, Row } from 'react-bootstrap';
import s from '@src/pages/Games/Games.css';
import { useRootStore } from '@src/stores/StoreContext';

export const GamesList = () => {
  const { gamesViewModel } = useRootStore();
  const listGames = gamesViewModel.filteredGames.map(game => (
    <Button className={s.gameCard} key={game.string_id}>
      {game.name}
    </Button>
  ));
  return (
    <>
      <Row>{listGames}</Row>;
    </>
  );
};

export default observer(GamesList);
