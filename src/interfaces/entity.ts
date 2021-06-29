import { DataObject } from './data-object';

export type RepoFunction = <T>(...args: any[]) => Promise<T> | T;

export interface Repository {
  aggregate: RepoFunction;
  count: RepoFunction;
  createIndex: RepoFunction;
  distinct: RepoFunction;
  drop: RepoFunction;
  dropIndex: RepoFunction;
  dropIndexes: RepoFunction;
  ensureIndex: RepoFunction;
  find: RepoFunction;
  findOne: RepoFunction;
  findAndModify: RepoFunction;
  getIndexes: RepoFunction;
  group: RepoFunction;
  insert: RepoFunction;
  isCapped: RepoFunction;
  mapReduce: RepoFunction;
  reIndex: RepoFunction;
  remove: RepoFunction;
  runCommand: RepoFunction;
  save: RepoFunction;
  stats: RepoFunction;
  update: RepoFunction;
}

export interface EntityInfo extends DataObject {
  repository: DataObject;
}
export interface EntityOptions extends DataObject {
  name?: string;
}
