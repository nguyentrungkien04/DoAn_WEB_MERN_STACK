import express from 'express';
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrder, verifyOrder, listOrder, updateOrderStatus } from "../controllers/orderController.js";


const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware, userOrder)
orderRouter.get("/list",listOrder)
orderRouter.post("/update",updateOrderStatus)

export default orderRouter;