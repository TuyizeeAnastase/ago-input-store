import { Request,Response } from "express";
import { AppDataSource } from "../config/database";
import { Order } from "../models/Order";
import { User } from "../models/User";
import { Seed } from "../models/Seed";
import { Fertilizer } from "../models/Fertilizer";

const orderRepository = AppDataSource.getRepository(Order);

export const createOrder=async(req:Request,res:Response)=>{
    const {seedId,fertilizerId,quantity_seed,quantity_fertilizer}=req.body

    const user=req.user as User

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
    

    try{
        const seed=await AppDataSource.getRepository(Seed).findOneBy({id:seedId});
        const fertilizer=await AppDataSource.getRepository(Fertilizer).findOneBy({id:fertilizerId});

        if(!seed || !fertilizer){
            return res.status(404).json({message:'Seed or Fertilizer not found'});
        }

        const order=new Order();
        order.user=user;
        order.seed=seed;
        order.fertilizer=fertilizer;
        order.quantity_fertilizer=quantity_fertilizer;
        order.quantity_seed=quantity_seed;

        await AppDataSource.getRepository(Order).save(order)

        return res.status(201).json({message:'Order created successfully',order});
    }catch(error){
        return res.status(500).json({message:'Server error',error})
    }
}

export const getOrders=async(req:Request,res:Response)=>{
    const user=req.user as User | undefined
    const {page=1,pageSize=10,sort='asc'}=req.query

    const skip=(Number(page)-1)*Number(pageSize);
    const take=Number(pageSize);

    try{
        let ordersQuery=orderRepository.createQueryBuilder('order')
        .leftJoinAndSelect('order.user','user')
        .leftJoinAndSelect('order.seed','seed')
        .leftJoinAndSelect('order.fertilizer','fertilizer');


        if(user){
            ordersQuery=ordersQuery.where('order.userId=:userId',{userId:user.id});
        }

        ordersQuery=ordersQuery
        .orderBy('user.email',sort==='desc'?'DESC':'ASC')
        .skip(skip)
        .take(take);

        const [orders,total]=await ordersQuery.getManyAndCount();

        res.json({
            data:orders,
            total,
            page:Number(page),
            pageSize:Number(pageSize)
        });
    }catch(error){
        res.status(500).json({message:'Error fetching orders'})
    }
}

export const approveOrder=async(req:Request,res:Response)=>{
    const { orderId  }=req.params;
    const { status }=req.body;

    const orderIdNumber = parseInt(orderId, 10); 

    try{
        const order = await AppDataSource.getRepository(Order).findOne({ where: { id: orderIdNumber } });
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        order.status=status;
        await AppDataSource.getRepository(Order).save(order);
        return res.status(200).json({message:'Order status updated successfully',order});
    }catch(error){
        return res.status(500).json({message:'Error updating order status',error})
    }
}