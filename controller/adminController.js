const db = require('../models')
const passport = require('passport')
const bcrypt = require('bcrypt')
const productController = require('./productController')

const Users = db.users



const initializePassport = require('../config/passport-config')
initializePassport(
    passport, 
    username=> Users.findOne({ where: { username: username }}),
    id=> Users.findOne({where:{id: id}})
)

// const index = (req,res)=>{ 
//     res.render('index.ejs', {name: req.user.username})
// }
const adminDashboard = (req,res)=>{ 
    res.render('admin-dashboard.ejs', {name: req.user.username})
}
const guestDashboard = (req,res)=>{ 
    res.render('guest-dashboard.ejs', {name: req.user.username, records: req.products})
}



const showRegister = async (req,res)=>{
    res.render('register.ejs')
}

const register = async(req,res)=>{
    try{
        console.log("Enter Register function")
       const hashedPassword = await bcrypt.hash(req.body.password, 10)
       const userInfo = {
        username:  req.body.username,
        password: hashedPassword
       }
       console.log(userInfo)
       const user = await Users.create(userInfo)
    //    users.push({
    //     id: Date.now().toString(),
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    //    })
       console.log(userInfo)

       res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
}

const showLoginPage = async(req, res) => {
    res.render('login.ejs')
}

// const login = (res,res,next)=>{
//     passport.authenticate('local',{
//         successRedirect: '/index',
//         failureRedirect: '/login',
//         failureFlash: true
//     })(req,res,next);
// }
const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

const getDashboard = async (req,res, next)=>{
    if (req.isAuthenticated()){
        if (req.user.username === 'admin'){
            res.redirect('/admin-dashboard')
        }else{
            res.redirect('/guest-dashboard')
        }
    }else{
        res.redirect('/login')
    }
}


const logout = (req, res)=>{
    req.logOut((err)=>{
        if (err){
            return next(err)
        }
        res.redirect('/login')
    })
}

function checkAuthenticated(req,res,next){
    if ( req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next){
    if ( req.isAuthenticated()){
        return res.redirect('/')
    }
    return next()
}

module.exports = {
    // index,
    showLoginPage,
    login,
    logout,
    showRegister,
    register,
    checkAuthenticated,
    checkNotAuthenticated,
    getDashboard,
    adminDashboard,
    guestDashboard
}