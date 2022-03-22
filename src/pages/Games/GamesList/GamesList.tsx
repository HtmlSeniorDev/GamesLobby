import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Button, Row } from 'react-bootstrap';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import s from '@src/pages/Games/Games.css';
import { useRootStore } from '@src/stores/StoreContext';

export const GamesList = () => {
  const { gamesViewModel } = useRootStore();
  const triggerRef: any = useRef<HTMLDivElement>();
  const entry = useIntersectionObserver(triggerRef, {});
  const isVisible = !!entry?.isIntersecting;

  const fetchNewPage = () => {
    gamesViewModel.pageNumber = gamesViewModel.pageNumber + 1;
    gamesViewModel.loadNextPage();
  };

  useEffect(() => {
    if (isVisible) {
      fetchNewPage();
    }
  }, [isVisible]);

  return (
    <>
      <Row>
        {gamesViewModel.filteredGames.map(game => {
          return (
            <Button className={s.gameCard} key={game.string_id}>
              {game.name}
            </Button>
          );
        })}
        <div ref={triggerRef} />;
      </Row>
    </>
  );
};

export default observer(GamesList);
