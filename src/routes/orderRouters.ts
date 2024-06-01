import { Router } from "express";
import { createOrder,getOrders,approveOrder } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateOrder } from "../validations/order";

const router=Router();

router.post('/order',authMiddleware,validateOrder,createOrder);
router.get('/orders',getOrders);
router.put("/orders/:orderId/approve", authMiddleware, approveOrder); 

export default router;