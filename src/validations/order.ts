import { Request,Response,NextFunction } from "express";
import {body,validationResult} from 'express-validator'

export const validateOrder=[
    body('seedId').isInt().withMessage('Seed ID must be an integer'),
    body('fertilizerId').isInt().withMessage('Feltizer ID must be an integer'),
    body('quantity_seed').isInt({min:1}).withMessage('Seed quantity must be atleast 1'),
    body('quantity_fertilizer').isInt({min:1}).withMessage('Fertilizer quantity must be atleast 1'),
    (req:Request,res:Response,next:NextFunction)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    }
]