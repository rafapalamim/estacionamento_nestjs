import { DataSource } from 'typeorm';
import { mysqlConfig } from '../config/mysql.config';

export const mysqlProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return new DataSource(mysqlConfig).initialize();
    },
  },
];
