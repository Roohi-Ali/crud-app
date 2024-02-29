require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session  = require('express-session')
const methodOverride = require('method-override')

const app =  express()

// const initializePassport = require('./config/passport-config')
// initializePassport(
//     passport, 
//     username=> users.find(user => user.username === username),
//     id=> users.find(user => user.id === id)
// )

const corsOptions = {
    origin: 'http://localhost:8081',
}

//middleware
app.set('view-engine','ejs')
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//routes
const routes = require('./routes/routes')
app.use('/', routes)

//api
// app.get('/', (req,res)=>{
//     res.json({message: 'Hello World'})
// })




const PORT = process.env.PORT || 8080
//server
app.listen(PORT, ()=>[
    console.log(`Server is running on ${PORT}`)
])