import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { Order } from './Order';

@Entity()
export class Fertilizer {
  @PrimaryGeneratedColumn()
  id!:number;

  @Column()
  name!:string;

  @Column()
  quantity!:number

  @Column()
  price!:number

  @OneToMany(()=>Order,(order)=>order.fertilizer)
  orders!:Order[]

}