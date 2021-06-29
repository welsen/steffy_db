import { DataObject } from "../interfaces/data-object";

export interface MongoDatabase {
  addUser: Function;
  collection: Function;
  createCollection: Function;
  dropDatabase: Function;
  eval: Function;
  getCollectionNames: Function;
  getLastError: Function;
  getLastErrorObj: Function;
  removeUser: Function;
  runCommand: Function;
  stats: Function;
  close: Function;
}
