import { DataSource } from 'typeorm';
import { User } from '../models/User'
import { Seed } from '../models/Seed';
import { Fertilizer } from '../models/Fertilizer';
import { Order } from '../models/Order';
import dotenv from 'dotenv';


dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.port as string, 10), 
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
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
