export interface IEmitHistory {
  eventName: string;
}

export interface IEmitHistoryList {
  [key: string]: Set<IEmitHistory>;
}
