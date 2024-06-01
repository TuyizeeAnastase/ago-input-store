import { Entity,Column,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Seed } from "./Seed";
import { Fertilizer } from "./Fertilizer";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    quantity_seed!: number;

    @Column()
    quantity_fertilizer!: number;

    @Column({ default: 'pending' })
    status!: string;

    @ManyToOne(()=>User,(user)=>user.orders)
    user!:User;

    @ManyToOne(()=>Seed,(seed)=>seed.orders)
    seed!:Seed;

    @ManyToOne(()=>Fertilizer,(fertilizer)=>fertilizer.orders)
    fertilizer!:Fertilizer;
}