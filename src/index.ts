import { RepositoryStore } from './repository-store';
import { EntityHandler } from './entity-handler';

export const repoStore: RepositoryStore = new RepositoryStore();
export let entityHandler: EntityHandler;

export function init() {
  entityHandler = new EntityHandler();
}
