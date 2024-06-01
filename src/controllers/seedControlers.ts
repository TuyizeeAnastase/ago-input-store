import { Request,Response } from "express";
import { AppDataSource } from "../config/database";
import { Seed } from "../models/Seed";

export const getSeeds=async(req:Request,res:Response)=>{
    try{
        const seedsRepository=AppDataSource.getRepository(Seed)
        const seeds=await seedsRepository.find();
        res.json(seeds)
    }catch(error){
        console.log(error)
    }
}