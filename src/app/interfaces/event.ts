export interface IEvent {
  id?: string;
  emitEventName: string;
  tabIndex?: number;
  data?: object;
  created?: Date;
}
