const productController = require('../controller/productController')
const adCont = require('../controller/adminController')
const router = require('express').Router()


router.get('/', adCont.checkAuthenticated, adCont.getDashboard )
router.get('/login', adCont.checkNotAuthenticated,adCont.showLoginPage)
router.post('/login',adCont.checkNotAuthenticated, adCont.login)
router.delete('/logout', adCont.logout)

router.get('/register', adCont.checkNotAuthenticated,adCont.showRegister)
router.post('/register', adCont.checkNotAuthenticated,adCont.register)
router.get('/dashboard', adCont.getDashboard)
router.get('/admin-dashboard', adCont.adminDashboard)
router.get('/guest-dashboard', productController.getAllProducts, adCont.guestDashboard)


// router.post('/login', passport.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }) )
// router.delete('/logout', (req, res)=>{
//     req.logOut((err)=>{
//         if (err){
//             return next(err)
//         }
//         res.redirect('/login')
//     })
// })

router.get('/getAddProduct', productController.getAddProduct)
router.post('/addProd', productController.addProduct)

router.get('/enterProdId', productController.enterProdId)
router.get('/all', productController.getAllProducts, productController.showAll)
router.post('/getSingleProductid', productController.getSingleProduct)
router.get('/published', productController.getPublishedProducts)

router.post('/updateProd', productController.updateProduct)
// router.post('/updDetails',productController.updDetails)
router.delete('/delProd', productController.deleteProduct)
router.post('/edit', productController.edit)



module.exports = router