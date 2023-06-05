import { DataSource } from 'typeorm';

export const sqliteProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        dropSchema: true,
        synchronize: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
