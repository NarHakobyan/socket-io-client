export interface IEmitHistory {
  eventName: string;
  channelName?: string;
}

export interface IEmitHistoryList {
  [key: string]: Set<IEmitHistory>;
}
