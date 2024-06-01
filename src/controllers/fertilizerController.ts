import { Request,Response } from "express";
import { AppDataSource } from "../config/database";
import { Fertilizer } from "../models/Fertilizer";

export const getFertilizers=async(req:Request,res:Response)=>{
    try{
      const fertilizerrepository=AppDataSource.getRepository(Fertilizer);
      const fertilizers=await fertilizerrepository.find();
      res.json(fertilizers)
        }catch(error){
            // res.status(500).json({error:error.message})
            console.log(error)
        }
}