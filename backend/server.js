// import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import products from './data/products.js'
import Product from "./models/productModel.js";
const port = process.env.PORT || 5000

connectDB() //connect to mongoDB

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/api/products', (req, res) => {3
    res.json(products)
})

app.get('/api/products/:id', (req, res) =>{
    
    const product = products.find((p) => p._id == req.params.id)
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
    
})

app.listen(port, () => console.log(`server running on ${port}`)) 
