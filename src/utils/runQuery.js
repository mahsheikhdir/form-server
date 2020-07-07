import { createTables, dropTables } from './queryFunctions';
import { dropUserTable } from './queries';

(async () => {
  await createTables();
})();
