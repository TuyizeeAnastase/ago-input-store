import express from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json';
import authRoutes from './routes/authRouters'
import orderRoutes from './routes/orderRouters'
import fertilizerRoutes from './routes/fertilizerRouters';
import seedsRoutes from './routes/seedsRouters'
import { AppDataSource } from './config/database'
import { User } from './models/User';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

const app=express();

app.use(cors()); 
app.use(bodyParser.json());

dotenv.config(); 


const PORT = process.env.PORT || 3000;

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.use('/api',authRoutes)
app.use('/api',orderRoutes)
app.use('/api',fertilizerRoutes)
app.use('/api',seedsRoutes)

AppDataSource.initialize().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error)=>{
    console.log('Error during Data Source initialization',error)
})