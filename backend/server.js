import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authroutes.js'
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/" , (req,res)=>{
  res.send("APi is running")
});

// Minimal test route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ message: "POST received", data: req.body });
});


app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})
.catch((err)=> console.log(err));