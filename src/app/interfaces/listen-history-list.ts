export interface IListenHistory {
  eventName: string;
}

export interface IListenHistoryList {
  [key: string]: Set<IListenHistory>;
}
