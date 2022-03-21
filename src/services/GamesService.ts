import jsonData from '@src/dataJson/games.json';
import { IGamesList, IGamesService } from '@src/services/types';

class GamesService implements IGamesService {
  public loadGamesData(): IGamesList {
    return JSON.parse(JSON.stringify(jsonData));
  }
}

export const gameService = new GamesService();
