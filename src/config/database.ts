import { DataSource } from 'typeorm';
import { User } from '../models/User'
import { Seed } from '../models/Seed';
import { Fertilizer } from '../models/Fertilizer';
import { Order } from '../models/Order';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'ago-input',
  synchronize: true,
  logging: false,
  entities: [User,Seed,Fertilizer,Order],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
