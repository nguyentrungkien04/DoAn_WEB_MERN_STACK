import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin:123@cluster0.jn9lx.mongodb.net/shopping_online").then(()=>console.log("DB Connected"));
}