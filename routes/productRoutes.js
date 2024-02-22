const productController = require('../controller/productController')
const router = require('express').Router()

router.get('/', productController.showAddProduct)
router.post('/addProd', productController.addProduct)

router.get('/enterProdId', productController.enterProdId)
router.get('/all', productController.getAllProducts)
router.post('/getSingleProductid', productController.getSingleProduct)
router.get('/published', productController.getPublishedProducts)

router.put('/updateProd', productController.updateProduct)
router.delete('/delProd', productController.deleteProduct)

module.exports = router