"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Seed_1 = require("../models/Seed");
const Fertilizer_1 = require("../models/Fertilizer");
const Order_1 = require("../models/Order");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'ago-input',
    synchronize: true,
    logging: false,
    entities: [User_1.User, Seed_1.Seed, Fertilizer_1.Fertilizer, Order_1.Order],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
