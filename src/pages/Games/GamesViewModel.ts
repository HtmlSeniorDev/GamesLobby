import { action, computed, IReactionDisposer, observable, reaction } from 'mobx';
import { IGame } from '@src/services/types';
import { RootStore } from '@src/stores/RootStore';

export enum FilterSelections {
  ALL = 'All',
}

export class GamesViewModel {
  @observable private searchText = '';
  @observable private sectionFilter = FilterSelections.ALL as string;
  @observable private tagsFilter = FilterSelections.ALL as string;
  @observable public isLoading = false;
  @observable public pages: IGame[] = [];
  @observable public pageNumber = 0;

  public root: RootStore;
  public reactionChangePage: IReactionDisposer | undefined;

  constructor(root: RootStore) {
    this.root = root;
    this.init();
  }

  public async init() {
    this.pages = await this.loadNextPage();
    this.reactionChangePage = reaction(
      () => this.pageNumber,
      async () => {
        this.pages = await this.loadNextPage();
      }
    );
  }

  public dispose() {
    if (this.reactionChangePage) {
      this.reactionChangePage();
    }
  }

  @computed public get filteredPages() {
    const searchPredicate = (item: IGame) => (this.searchText ? item.name.includes(this.searchText) : true);

    const sectionPredicate = (item: IGame) =>
      this.sectionFilter && this.sectionFilter !== FilterSelections.ALL
        ? item.section.includes(this.sectionFilter.trim().toLowerCase()) || item.section.includes(this.sectionFilter)
        : true;

    const tagPredicate = (item: IGame) =>
      this.tagsFilter && this.tagsFilter !== FilterSelections.ALL
        ? item.tags.includes(this.tagsFilter.trim().toLowerCase()) || item.tags.includes(this.tagsFilter)
        : true;

    return this.pages.filter(searchPredicate).filter(sectionPredicate).filter(tagPredicate);
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

  @action
  public loadNextPage = async () => {
    this.isLoading = true;
    const apiGames = await this.root.gamesStore.gamesPageIterator(this.pageNumber);
    this.isLoading = false;
    let records: IGame[] = [];

    for await (const record of apiGames) {
      records = records.concat(record.data);
    }

    return [...new Set([...this.pages, ...records])];
  };
}
