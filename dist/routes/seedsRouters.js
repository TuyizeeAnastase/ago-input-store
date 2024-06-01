"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seedControlers_1 = require("../controllers/seedControlers");
const router = (0, express_1.Router)();
router.get('/seeds', seedControlers_1.getSeeds);
exports.default = router;
