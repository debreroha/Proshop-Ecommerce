import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import products from './data/products.js'
const port = process.env.PORT || 5000

connectDB() //connect to mongoDB

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) =>{
    productId = req.params.id
    const product = productsmap((p) => p._id === productId)
    res.json(product)
})

app.listen(port, () => console.log(`server running on ${port}`)) 
