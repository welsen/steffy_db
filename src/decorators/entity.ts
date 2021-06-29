import { storage } from '@steffy/di';
import 'reflect-metadata';
import { entityHandler, repoStore } from '..';
import { PluginConfig } from '../repository-store';
import { RepositoryFactory } from '../factories/repository';
import { EntityOptions } from '../interfaces/entity';

export function SteffyEntity(options?: EntityOptions): ClassDecorator;
export function SteffyEntity(name?: string, options?: EntityOptions): ClassDecorator;
export function SteffyEntity(nameOrOptions?: any, maybeOptions?: any): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(
      'steffy:db:entity',
      { name: typeof nameOrOptions === 'string' ? nameOrOptions : nameOrOptions.name, options: maybeOptions || {} },
      target
    );
    let repo: any = async () => {
      const config = storage.get<{ orm: PluginConfig }>('SteffyConfig').orm;
      if (config.driver === 'mongodb') {
        const client = entityHandler.client;
        const meta = Reflect.getMetadata('steffy:db:entity', target);
        let collection = await client.db.collection(meta.name);
        return new (RepositoryFactory.create(collection, 'mongodb')!)();
      }
      return null;
    };
    repoStore.storeRepository(target, repo);
  };
}
