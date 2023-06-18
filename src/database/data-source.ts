import { DB_TYPE, DB_URI } from '@shared/environment';
import { DataSource } from 'typeorm';
import { CustomNamingStrategy } from './database.helpers';
import entities from './entities';

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  url: DB_URI,
  synchronize: false,
  logging: false,
  entities: entities,
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
  namingStrategy: new CustomNamingStrategy(),
});
