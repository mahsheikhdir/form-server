import {
    dropTables,
    createTables,
    insertIntoTables,
  } from '../src/utils/queryFunctions';
  
  before(async () => {
    await createTables();
  });
  
  after(async () => {
    await dropTables();
  });