import { action, computed, observable } from 'mobx';
import { IGame, TTag } from '@src/services/types';
import { RootStore } from '@src/stores/RootStore';

enum FilterSelections {
  ALL = 'All',
}

export class GamesViewModel {
  @observable public searchText = '';
  @observable public sectionFilter = '';
  @observable public tagsFilter = '';
  @observable public tags: TTag[] = [];

  public root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  public changeTagsFilter = (value: string) => {
    this.tagsFilter = value;
  };

  @action
  public changeSearchFilter = (value: string) => {
    this.searchText = value;
  };

  @action
  public changeSectionFilter = (value: string) => {
    this.sectionFilter = value;
  };

  @computed
  public get filteredGames(): IGame[] {
    const { games } = this.root.gamesStore;

    if (!games) {
      return [];
    }

    return this.transformerGames(games);
  }

  @computed
  public get filteredTags(): TTag[] {
    const { games, gamesTags } = this.root.gamesStore;
    this.transformerTags(games, gamesTags);
    return this.tags;
  }

  @action
  private transformerTags = (games: IGame[], gamesTags: TTag[]) => {
    const filteredTags = new Set<TTag>();

    for (const game of games) {
      for (const tag of gamesTags) {
        if (game.tags.includes(tag.name) || game.tags.includes(tag.name.trim().toLowerCase())) {
          filteredTags.add(tag);
        }
      }
    }

    this.tags = [...filteredTags];
  };

  private transformerGames = (data: IGame[]): IGame[] => {
    const searchPredicate = (item: IGame) => (this.searchText ? item.name.includes(this.searchText) : true);

    const sectionPredicate = (item: IGame) =>
      this.sectionFilter && this.sectionFilter !== FilterSelections.ALL
        ? item.section.includes(this.sectionFilter.trim().toLowerCase() || item.section)
        : true;

    const tagPredicate = (item: IGame) =>
      this.tagsFilter && this.tagsFilter !== FilterSelections.ALL ? item.tags.includes(this.tagsFilter) : true;

    return data.filter(searchPredicate).filter(sectionPredicate).filter(tagPredicate);
  };
}
