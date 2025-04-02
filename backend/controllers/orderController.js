import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item)=> ({
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: 'Shipping Fee'
                },
                unit_amount: 20000
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // ✅ BẮT BUỘC
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({success:true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "Error"})
    }
}

// verifying user order after payment
const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success:true, message: "Paid successfully"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message: "Payment failed"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// user order list
const userOrder = async (req, res) => {
    try {
        const orders= await orderModel.find({userId: req.body.userId})
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// danh sach don hang cua admin
const listOrder = async (req, res) => {
    try {
        const orders= await orderModel.find({})
        res.json({success:true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

//api for update order status
const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message: "Updated successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

export { placeOrder, verifyOrder, userOrder, listOrder, updateOrderStatus };