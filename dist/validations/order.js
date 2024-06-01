"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
const express_validator_1 = require("express-validator");
exports.validateOrder = [
    (0, express_validator_1.body)('seedId').isInt().withMessage('Seed ID must be an integer'),
    (0, express_validator_1.body)('fertilizerId').isInt().withMessage('Feltizer ID must be an integer'),
    (0, express_validator_1.body)('quantity_seed').isInt({ min: 1 }).withMessage('Seed quantity must be atleast 1'),
    (0, express_validator_1.body)('quantity_fertilizer').isInt({ min: 1 }).withMessage('Fertilizer quantity msut be atleast 1'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
