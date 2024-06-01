import { Request,Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import bcrypt from 'bcryptjs'
import jwt  from "jsonwebtoken";
import {validate} from 'class-validator'
import dotenv from 'dotenv';


dotenv.config(); 

const userRepository = AppDataSource.getRepository(User)

export const registerUser=async(req:Request,res:Response)=>{
    const {email,password,role}=req.body;

    const user=new User();
    user.email=email;
    user.password=await bcrypt.hash(password,10)
    user.role=role;

    const errors=await validate(user)
    if(errors.length > 0){
        return res.status(400).json(errors)
    }
    await userRepository.save(user)
    res.status(201).json({message:'USer created successfully'})
}

export const login=async(req:Request,res:Response)=>{
    const {email,password}=req.body;

    const user=await userRepository.findOneBy({email});
    if(!user){
        return res.status(404).json({message:'USer not found'})
    }
    
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(401).json({message:'Invalid password'})
    }

    const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET as string,{expiresIn:'1h'});
    res.json({token})
}

