import { Request,Response,NextFunction } from "express";
import  jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import {User} from '../models/User'
import dotenv from 'dotenv';

dotenv.config(); 

interface AuthRequest extends Request {
    user?: User;
  }

export const authMiddleware=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).json({message:'Access denied'})
    }
    try{
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        // (req as any).user=decoded;
        const user=await AppDataSource.getRepository(User).findOneBy({id:decoded.id})
        if(!user){
            return res.status(401).json({message:'Invalid user'})
        }
        req.user=user;
        next();
    }catch(error){
        res.status(401).json({message:'Invalid Token or Expired'})
    }
}

