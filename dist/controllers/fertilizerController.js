"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFertilizers = void 0;
const database_1 = require("../config/database");
const Fertilizer_1 = require("../models/Fertilizer");
const getFertilizers = async (req, res) => {
    try {
        const fertilizerrepository = database_1.AppDataSource.getRepository(Fertilizer_1.Fertilizer);
        const fertilizers = await fertilizerrepository.find();
        res.json(fertilizers);
    }
    catch (error) {
        // res.status(500).json({error:error.message})
        console.log(error);
    }
};
exports.getFertilizers = getFertilizers;
