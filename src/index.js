import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constatns/index.js';
import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  startServer();
};

void bootstrap();
