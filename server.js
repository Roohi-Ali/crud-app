const express = require('express')
const cors = require('cors')

const app =  express()

const corsOptions = {
    origin: 'http://localhost:8081',
}

//middleware
app.set('view-engine','ejs')
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
const productRoutes = require('./routes/productRoutes')
app.use('/', productRoutes)

//api
// app.get('/', (req,res)=>{
//     res.json({message: 'Hello World'})
// })




const PORT = process.env.PORT || 8080
//server
app.listen(PORT, ()=>[
    console.log(`Server is running on ${PORT}`)
])