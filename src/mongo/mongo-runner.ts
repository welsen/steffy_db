import { strictEqual, notStrictEqual } from 'assert';
import { promisify } from 'util';
import { PluginConfig } from '../repository-store';
import { DbFactory } from '../factories/db';
import { DataObject } from '../interfaces/data-object';
import { Client } from '../types/client';

const mongodb = require('mongodb');
const mongojs = require('mongojs');

export class MongoRunner implements Client {
  private connStr: string;
  private config: PluginConfig;
  private _connect = promisify(mongodb.MongoClient.connect);

  public connected: boolean = false;
  public connection: DataObject = {};
  public db: DataObject = {};

  constructor(connection: string | PluginConfig) {
    let connectionString: string | PluginConfig = connection;
    if (typeof connection !== 'string') {
      this.config = connection;
      connectionString = `${this.config.driver}://${this.config.options && this.config.options.username}:${
        this.config.options && this.config.options.password
      }@${this.config.options && this.config.options.host}:${this.config.options && this.config.options.port}/${
        this.config.options && this.config.options.database
      }?authSource=${
        this.config.options && this.config.options.settings && this.config.options.settings.authSource
      }&useUnifiedTopology=true`;
    } else {
      const m = (<string>connectionString).match(
        /^(?<protocol>(?<driver>\w+):\/\/)(?<userInfo>(?<username>[\w\d-_]+):(?<password>[\w\W\d-_]+)@)?(?<host>[\w\W\d-_]+):(?<port>[\d]{0,5})(?<path>[\/]?(?<database>[\w\d-_]+)(?<queryOptions>\??(?<query>(.*=.+)*(&.*=.+)?)))$/
      );
      this.config = { driver: (m && m.groups && m.groups.driver) || 'mongodb', options: { ...(m && m.groups) } };
    }
    this.connStr = <string>connectionString;
  }

  async connect() {
    this.connection = await this._connect(this.connStr);
    this.connected = true;
    const _db = this.connection.db((this.config.options && this.config.options.database) || 'test');
    this.db = new (DbFactory.create(mongojs(_db)))();
  }

  startSession() {
    notStrictEqual(this.connection, null, 'No Connection...');
    strictEqual(this.connected, true, 'No Connection...');

    return this.connection.startSession();
  }

  close() {
    this.connection.close();
    this.connected = false;
  }
}
