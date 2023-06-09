import { DataSource } from 'typeorm';
import { sqliteConfig } from '../config/sqlite.config';

export const sqliteProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return new DataSource(sqliteConfig).initialize();
    },
  },
];
