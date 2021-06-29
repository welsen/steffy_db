import { jsonLoader } from '@steffy/core';
import '../src';
import { entityHandler, init, repoStore } from '../src';
import { Account } from './entities/account.entity';

jsonLoader('./tests/configs/', 'config').then(() => {
  init();
  setTimeout(async () => {
    const repo = await repoStore.getRepository(Account);
    if (repo) {
      const admin = await repo.findOne<Account>({ email: 'admin@example.com' });
      console.log(admin);
    }
    entityHandler.client.close();
  }, 1000);
});
