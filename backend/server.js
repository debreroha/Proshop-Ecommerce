// import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js"
const port = process.env.PORT || 5000

connectDB() //connect to mongoDB

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// })

// app.get('/api/products/:id',  async (req, res) =>{
    
//     try {
//         const product = await Product.findById(req.params.id);

//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// })

app.use('/api/products', productRoutes)

app.listen(port, () => console.log(`server running on port ${port}`)) 
