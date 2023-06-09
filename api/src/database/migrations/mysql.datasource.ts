import { DataSource } from 'typeorm';
import { mysqlConfig } from '../config/mysql.config';

export const MYSQLDataSource = new DataSource(mysqlConfig);
