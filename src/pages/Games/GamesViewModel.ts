import { action, IReactionDisposer, observable, reaction } from 'mobx';
import { IGame, TTag } from '@src/services/types';
import { RootStore } from '@src/stores/RootStore';

export enum FilterSelections {
  ALL = 'All',
}

export class GamesViewModel {
  @observable private searchText = '';
  @observable private sectionFilter = FilterSelections.ALL as string;
  @observable private tagsFilter = FilterSelections.ALL as string;
  @observable public isLoading = false;
  @observable public originalGames: IGame[] = [];
  @observable public filteredGames: IGame[] = [];
  @observable public filteredTags: TTag[] = [];
  @observable public pageNumber = 0;

  public root: RootStore;
  public reactionChangePage: IReactionDisposer | undefined;

  constructor(root: RootStore) {
    this.root = root;
    this.transformerTags();
    this.init();
  }

  public async init() {
    this.filteredGames = this.transformerGames(await this.loadNextPage());

    this.reactionChangePage = reaction(
      () => this.pageNumber,
      async () => {
        this.filteredGames = this.transformerGames(await this.loadNextPage());
      }
    );
  }

  public dispose() {
    if (this.reactionChangePage) {
      this.reactionChangePage();
    }
  }

  @action
  public changeTagsFilter = async (value: string) => {
    this.tagsFilter = value;
    this.filteredGames = this.transformerGames(await this.loadNextPage());
  };

  @action
  public changeSearchFilter = async (value: string) => {
    this.searchText = value;
    this.filteredGames = this.transformerGames(await this.loadNextPage());
  };

  @action
  public changeSectionFilter = async (value: string) => {
    this.sectionFilter = value;
    this.filteredGames = this.transformerGames(await this.loadNextPage());
    this.setTags();
  };

  @action
  public setTags = () => {
    return this.transformerTags();
  };

  @action
  private transformerTags = () => {
    const { games, gamesTags } = this.root.gamesStore;
    const filteredTags = new Set<TTag>();

    if (this.sectionFilter === FilterSelections.ALL) {
      return gamesTags;
    }

    for (const game of games) {
      for (const tag of gamesTags) {
        if (game.tags.includes(tag.name) || game.tags.includes(tag.name.trim().toLowerCase())) {
          filteredTags.add(tag);
        } else {
          filteredTags.delete(tag);
        }
      }
    }

    this.filteredTags = [...filteredTags];
  };

  @action
  public transformerGames = (games: IGame[]) => {
    this.originalGames = games;

    const searchPredicate = (item: IGame) => (this.searchText ? item.name.includes(this.searchText) : true);

    const sectionPredicate = (item: IGame) =>
      this.sectionFilter && this.sectionFilter !== FilterSelections.ALL
        ? item.section.includes(this.sectionFilter.trim().toLowerCase() || item.section)
        : true;

    const tagPredicate = (item: IGame) =>
      this.tagsFilter && this.tagsFilter !== FilterSelections.ALL
        ? item.tags.includes(this.tagsFilter.trim().toLowerCase())
        : true;

    return games.filter(searchPredicate).filter(sectionPredicate).filter(tagPredicate);
  };

  @action
  public loadNextPage = async () => {
    this.isLoading = true;
    const apiGames = await this.root.gamesStore.gamesPageIterator(this.pageNumber);
    this.isLoading = false;
    let records: IGame[] = [];

    for await (const record of apiGames) {
      records = records.concat(record.data);
    }

    return [...new Set([...this.filteredGames, ...records])];
  };
}
