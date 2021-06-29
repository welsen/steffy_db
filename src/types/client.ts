import { DataObject } from '../interfaces/data-object';

export interface Client {
  connected: boolean;
  connect: Function;
  close: Function;
  db: DataObject;
  startSession: Function;
}
