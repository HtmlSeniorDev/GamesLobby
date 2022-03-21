import { computed, observable } from 'mobx';
import { gameService } from '@src/services/GamesService';
import { IGamesList } from '@src/services/types';
import { RootStore } from '@src/stores/RootStore';

export class GamesStore {
  @observable public gamesObject: IGamesList | null;
  private root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    this.gamesObject = null;
  }

  public fetchGames() {
    this.gamesObject = gameService.loadGamesData();
  }

  @computed public get gamesTags() {
    return this.gamesObject?.tags || [];
  }

  @computed public get gamesSections() {
    return this.gamesObject?.sections || [];
  }

  @computed public get games() {
    return this.gamesObject?.games || [];
  }
}
