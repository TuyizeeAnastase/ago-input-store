"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // (req as any).user=decoded;
        const user = await database_1.AppDataSource.getRepository(User_1.User).findOneBy({ id: decoded.id });
        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid Token or Expired' });
    }
};
exports.authMiddleware = authMiddleware;
