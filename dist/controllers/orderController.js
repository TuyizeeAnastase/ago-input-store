"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const database_1 = require("../config/database");
const Order_1 = require("../models/Order");
const Seed_1 = require("../models/Seed");
const Fertilizer_1 = require("../models/Fertilizer");
const orderRepository = database_1.AppDataSource.getRepository(Order_1.Order);
const createOrder = async (req, res) => {
    const { seedId, fertilizerId, quantity_seed, quantity_fertilizer } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const seed = await database_1.AppDataSource.getRepository(Seed_1.Seed).findOneBy({ id: seedId });
        const fertilizer = await database_1.AppDataSource.getRepository(Fertilizer_1.Fertilizer).findOneBy({ id: fertilizerId });
        if (!seed || !fertilizer) {
            return res.status(404).json({ message: 'Seed or Fertilizer not found' });
        }
        const order = new Order_1.Order();
        order.user = user;
        order.seed = seed;
        order.fertilizer = fertilizer;
        order.quantity_fertilizer = quantity_fertilizer;
        order.quantity_seed = quantity_seed;
        await database_1.AppDataSource.getRepository(Order_1.Order).save(order);
        return res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const user = req.user;
    const { page = 1, pageSize = 10, sort = 'asc' } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);
    try {
        let ordersQuery = orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.seed', 'seed')
            .leftJoinAndSelect('order.fertilizer', 'fertilizer');
        if (user) {
            ordersQuery = ordersQuery.where('order.userId=:userId', { userId: user.id });
        }
        ordersQuery = ordersQuery
            .orderBy('user.email', sort === 'desc' ? 'DESC' : 'ASC')
            .skip(skip)
            .take(take);
        const [orders, total] = await ordersQuery.getManyAndCount();
        res.json({
            data: orders,
            total,
            page: Number(page),
            pageSize: Number(pageSize)
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
exports.getOrders = getOrders;
