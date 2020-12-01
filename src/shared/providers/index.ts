import { container } from 'tsyringe';

import IStoraProvider from './DiskStorageProvider/models/IStorageProvider';
import DiskStorageProvider from './DiskStorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoraProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
