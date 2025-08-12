import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
