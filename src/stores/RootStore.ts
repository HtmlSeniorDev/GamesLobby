import { GamesViewModel } from '@src/pages/Games/GamesViewModel';
import { GamesStore } from '@src/stores/GamesStore';

export class RootStore {
  public gamesStore: GamesStore;
  public gamesViewModel: GamesViewModel;

  constructor() {
    this.gamesStore = new GamesStore(this);
    this.gamesViewModel = new GamesViewModel(this);
  }
}
