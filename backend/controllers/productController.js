import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

//fetch all products
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
        res.json(products)
})

// fetch a product
// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        return res.json(product)
    }else{
        res.status(404)
        throw new("Resource not found")
    }
})

export {getProducts, getProductById}
