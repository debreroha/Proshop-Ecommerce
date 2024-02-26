import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
import { noFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
const port = process.env.PORT || 5000

connectDB() //connect to mongoDB

const app = express()

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('API is running')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(noFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running on port ${port}`)) 
