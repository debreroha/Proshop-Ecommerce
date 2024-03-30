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

// @desc Create a product
// ROUTE POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product ({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brad: 'Sample brand',
        category: 'Sample Categoroy',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createProduct)
})

//@desc update a products
//route PUT /api/products/:id
//@access Private/admin

const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if( product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else {
        res.status(404)
        throw new Error('Rosource not found')
    }
})

export {getProducts, getProductById, createProduct, updateProduct}
