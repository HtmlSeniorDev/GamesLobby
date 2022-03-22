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

  public async fetchGames(page = 0, limit = 20) {
    this.gamesObject = gameService.loadGamesData();
    const start = page * limit;
    const end = (page + 1) * limit;
    return {
      data: this.gamesObject?.games?.slice(start, end),
      done: end >= this.gamesObject?.games?.length,
      start,
      end,
    };
  }

  public async *gamesPageIterator(page = 0, limit = 24) {
    const records = await this.fetchGames(page, limit);
    yield records!;
    if (records?.done) return;
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
