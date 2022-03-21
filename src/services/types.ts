export interface IGamesService {
  loadGamesData: () => IGamesList;
}

export interface IValue {
  id: string;
  name: string;
}

export type TTag = IValue;
type TSections = IValue;

export interface IGame {
  string_id: string;
  name: string;
  tags: Array<string>;
  section: string;
}

export interface IGamesList {
  sections: Array<TSections>;
  games: Array<IGame>;
  tags: Array<TTag>;
}
