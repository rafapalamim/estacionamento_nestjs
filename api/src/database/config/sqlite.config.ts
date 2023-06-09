import { DataSourceOptions } from 'typeorm';

export const sqliteConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  dropSchema: true,
  synchronize: true,
  logging: false,
};
