import { container } from 'tsyringe';
import uploadsConfig from '@config/uploads';
import IStoraProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStoraProvider>(
  'StorageProvider',
  providers[uploadsConfig.driver],
);
