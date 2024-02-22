const db = require('../models')

const Products = db.products

const showAddProduct = async (req, res) => {
    res.render('addproduct.ejs')
}

//create product
const addProduct = async (req, res) => {
    if (!req.body.title) {
        console.log('error here1')
        res.status(400).send({
            message: 'Pease Insert Title'
        })
        return
    }

    const productInfo = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }
    try {
        console.log(productInfo)
        const product = await Products.create(productInfo)
        console.log('error here2')
        res.status(200).send(product)
        console.log(product)
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error Occurred'
        })
    }

}


//get all products
const getAllProducts = async(req,res)=>{
    const products  = await Products.findAll({})
    res.status(200).send(products)
}

const enterProdId = async(req,res)=>{
    res.render('productid.ejs')
}

//get single product
const getSingleProduct = async (req,res)=>{
    const id = req.body.id
    const product = await Products.findOne({where: { id: id}})
    res.status(200).send(product)
}

//update product
const updateProduct = async(req,res)=>{
    const id = req.body.id
    const product = await Products.update(req.body, {where: {id:id}})
    res.status(200).send(product)
}

// delete product
const deleteProduct = async(req,res)=>{
    const id = req.body.id
    await Products.destroy({ where: { id: id}})
    res.status(200).send('Product is deleted')
}

const getPublishedProducts = async(req,res)=>{

    const products = await Products.findAll({ where: { published: true}})
    res.status(200).send(products)
}


module.exports = {
    showAddProduct,
    enterProdId,
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts
}