export interface IEvent {
  id?: string;
  emitEventName: string;
  emitChannelName?: string;
  tabIndex?: number;
  data?: object;
  created?: Date;
}
