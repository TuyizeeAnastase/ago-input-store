"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRepository = database_1.AppDataSource.getRepository(User_1.User);
const registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    const user = new User_1.User();
    user.email = email;
    user.password = await bcryptjs_1.default.hash(password, 10);
    user.role = role;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    await userRepository.save(user);
    res.status(201).json({ message: 'USer created successfully' });
};
exports.registerUser = registerUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) {
        return res.status(404).json({ message: 'USer not found' });
    }
    const validPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
exports.login = login;
