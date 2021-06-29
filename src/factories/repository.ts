import { DataObject } from '../interfaces/data-object';
import { promisify } from 'util';
import { Repository } from '../interfaces/entity';

export class RepositoryFactory {
  private static createMongoRepo(collection: DataObject) {
    return class implements Repository {
      public aggregate = <any>promisify(collection.aggregate.bind(collection));
      public count = <any>promisify(collection.count.bind(collection));
      public createIndex = <any>promisify(collection.createIndex.bind(collection));
      public distinct = <any>promisify(collection.distinct.bind(collection));
      public drop = <any>promisify(collection.drop.bind(collection));
      public dropIndex = <any>promisify(collection.dropIndex.bind(collection));
      public dropIndexes = <any>promisify(collection.dropIndexes.bind(collection));
      public ensureIndex = <any>promisify(collection.ensureIndex.bind(collection));
      public find = <any>promisify(collection.find.bind(collection));
      public findOne = <any>promisify(collection.findOne.bind(collection));
      public findAndModify = <any>promisify(collection.findAndModify.bind(collection));
      public getIndexes = <any>promisify(collection.getIndexes.bind(collection));
      public group = <any>promisify(collection.group.bind(collection));
      public insert = <any>promisify(collection.insert.bind(collection));
      public isCapped = <any>promisify(collection.isCapped.bind(collection));
      public mapReduce = <any>promisify(collection.mapReduce.bind(collection));
      public reIndex = <any>promisify(collection.reIndex.bind(collection));
      public remove = <any>promisify(collection.remove.bind(collection));
      public runCommand = <any>promisify(collection.runCommand.bind(collection));
      public save = <any>promisify(collection.save.bind(collection));
      public stats = <any>promisify(collection.stats.bind(collection));
      public update = <any>promisify(collection.update.bind(collection));
    };
  }

  static create(tableOrCollection: DataObject, driver: string) {
    if (driver === 'mongodb') {
      return this.createMongoRepo(tableOrCollection);
    }
  }
}
