import { moduleLoader } from '@steffy/core';
import { storage } from '@steffy/di';
import { Client } from './types/client';
import { PluginConfig } from './repository-store';
import { MongoRunner } from './mongo/mongo-runner';
import { DataObject } from './interfaces/data-object';

export class EntityHandler {
  private config: PluginConfig;
  public client: Client | DataObject = {};

  constructor() {
    const config = storage.get<{ orm: PluginConfig }>('SteffyConfig');
    this.config = config.orm;
    if (this.config.driver === 'mongodb') {
      this.client = new MongoRunner(this.config);
      this.client.connect().then(async () => {
        await this.collectEntities();
      });
    }
  }

  private async collectEntities() {
    await moduleLoader((this.config.paths && this.config.paths.entities) || './entities', 'entity');
  }
}
