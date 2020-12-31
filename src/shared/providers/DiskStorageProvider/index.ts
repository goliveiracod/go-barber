import { container } from 'tsyringe';

import IStoraProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStoraProvider>('StorageProvider', providers.disk);
