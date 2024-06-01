"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeeds = void 0;
const database_1 = require("../config/database");
const Seed_1 = require("../models/Seed");
const getSeeds = async (req, res) => {
    try {
        const seedsRepository = database_1.AppDataSource.getRepository(Seed_1.Seed);
        const seeds = await seedsRepository.find();
        res.json(seeds);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSeeds = getSeeds;
