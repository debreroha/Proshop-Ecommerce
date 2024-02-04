// import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import { noFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js"
const port = process.env.PORT || 5000

connectDB() //connect to mongoDB

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})
app.use('/api/products', productRoutes)

app.use(noFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running on port ${port}`)) 
