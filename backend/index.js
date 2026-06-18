import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import {webhookController} from "./controller/payment.controller.js"

import { connectCloudinary } from "./config/cloudinary.js";

const app = express();

await connectCloudinary();

const allowedOrigins = [`${process.env.CLIENT_URL}`];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.post("/api/payment/webhook",express.raw({type:"application/json"}))
app.use(cookieParser());
app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
