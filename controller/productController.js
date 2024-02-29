const db = require('../models')

const Products = db.products

const getAddProduct = async (req, res) => {
    await res.render('addproduct.ejs', {name: req.user.username})
}

//create product
const addProduct = async (req, res) => {
    
    if (!req.body.title) {
        
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
        res.render('productDetails.ejs', {message:'Product Added',product: product})
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error Occurred'
        })
    }

}


//get all products
const getAllProducts = async(req,res, next)=>{
    try{
        const products  = await Products.findAll({})
        req.products = products
        next()
        // res.render('main.ejs', { records: products })
    }catch(error){
        next(error)
    }
}

const showAll = async(req, res)=>{
    await res.render('showAll.ejs', {name:req.user.username ,records: req.products})
}
const enterProdId = async(req,res)=>{
    res.render('productid.ejs')
}

//get single product
const getSingleProduct = async (req,res)=>{
    const id = req.body.id
    const product = await Products.findOne({where: { id: id}})
    res.render('productDetails.ejs', {message:'Product Details Sent',product: product})
}

//update product
const updateProduct = async(req,res)=>{
    const id = req.body.id
    const product = await Products.findOne({where: { id: id}})
    req.session.productId = product.id
    res.render('updateProduct.ejs',{message:'Enter Product Details that need to be edited',product:product})
}

const edit = async (req,res)=>{
    const id = req.session.productId
    await Products.update({ 
        title: req.body.title, 
        price: req.body.price, 
        description: req.body.description},
        { where: {id: id}})

    const product = await Products.findOne({where: { id: id}})
    res.render('productDetails.ejs', {message:'Product Update Successfully',product: product})
    
}

// delete product
const deleteProduct = async(req,res)=>{
    try{
        const id = req.body.id
        const product = await Products.findOne({where: { id: id}})
        if (!product){
            return res.status(404).send('Product not found')
        }
        await Products.destroy({ where: { id: id}})
        res.render('productDetails.ejs', {message:'Product deleted successfully', product:""})
    }catch(err){
        console.log(err)
    }
}

const getPublishedProducts = async(req,res)=>{

    const products = await Products.findAll({ where: { published: true}})
    res.status(200).send(products)
}



module.exports = {
    getAddProduct,
    enterProdId,
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts,
    showAll,
    edit
}