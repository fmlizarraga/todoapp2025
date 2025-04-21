import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/User';
import { Todo } from '../entities/Todo';
import {
  DB_TYPE,
  DB_PATH,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from './env';

let dataSourceOptions: DataSourceOptions;

if (DB_TYPE === 'sqlite') {
  dataSourceOptions = {
    type: 'sqlite',
    database: DB_PATH,
    entities: [User, Todo],
    synchronize: true,
    logging: false,
  };
} else if (DB_TYPE === 'postgres') {
  dataSourceOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User, Todo],
    synchronize: true,
    logging: false,
  };
} else {
  throw new Error(`Unsupported DB_TYPE: ${DB_TYPE}`);
}

export const AppDataSource = new DataSource(dataSourceOptions);
