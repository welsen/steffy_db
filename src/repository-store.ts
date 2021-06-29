import { DataObject } from './interfaces/data-object';
import { EntityInfo, EntityOptions, Repository } from './interfaces/entity';
import Identifier from './types/identifier';

export enum MetaDataKeys {
  Entity = 'steffy:db:entity'
}

export interface PluginSettings extends DataObject {
  authSource?: string;
}

export interface PluginOptions {
  host?: string;
  port?: string;
  database?: string;
  username?: string;
  password?: string;
  settings?: PluginSettings;
}

export interface PluginPaths {
  entities: string;
  migrations: string;
}

export interface PluginConfig {
  driver?: string;
  options?: PluginOptions;
  paths?: PluginPaths;
}

export class RepositoryStore {
  private container: Map<Identifier<unknown>, any>;

  constructor() {
    this.container = new Map();
  }

  storeRepository<K extends Repository, T>(key: Identifier<K>, entity: Promise<T | null>) {
    if (!this.container.has(key)) {
      this.container.set(key, entity);
    }
  }

  getRepository<K extends Repository, T>(key: Identifier<T>): Promise<K> {
    if (this.container.has(key)) {
      return this.container.get(key)();
    }
    return Array.from(this.container.values()).find((entity) => {
      const meta = <EntityOptions>Reflect.getMetadata(MetaDataKeys.Entity, entity);
      return meta.name === <string>key;
    })();
  }
}
