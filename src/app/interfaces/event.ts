export interface IEvent {
  id?: string;
  emitEventName: string;
  emitChannelName?: string;
  tabId?: string;
  data?: object;
  created?: Date;
}
