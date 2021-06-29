import { promisify } from 'util';
import { DataObject } from '../interfaces/data-object';
import { MongoDatabase } from '../types/mongo-database';

export class DbFactory {
  static create(db: DataObject) {
    return class implements MongoDatabase {
      public addUser = db.addUser.bind(db);
      public collection = db.collection.bind(db);
      public createCollection = promisify(db.createCollection.bind(db));
      public dropDatabase = promisify(db.dropDatabase.bind(db));
      public eval = promisify(db.eval.bind(db));
      public getCollectionNames = promisify(db.getCollectionNames.bind(db));
      public getLastError = promisify(db.getLastError.bind(db));
      public getLastErrorObj = promisify(db.getLastErrorObj.bind(db));
      public removeUser = promisify(db.removeUser.bind(db));
      public runCommand = promisify(db.runCommand.bind(db));
      public stats = promisify(db.stats.bind(db));
      public close = db.close.bind(db);
      constructor() {}
    };
  }
}
