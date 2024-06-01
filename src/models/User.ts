import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Order } from './Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @Length(6, 100)
  password!: string;

  @Column()
  role!: string;

  @OneToMany(()=>Order,(order)=>order.user)
  orders!:Order[];

}