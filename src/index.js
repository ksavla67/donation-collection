require('../mongoose/mongoose')
const mongoose=require('mongoose')
const express = require("express")
const ejs = require('ejs')
const path = require('path')
const hbs = require('hbs')
const auth = require('../middleware/auth')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')


const Box = require('../models/box')
const User = require('../models/user')
const collectiondata = require('../models/collection')
const userRouter = require('./router/user')
const boxRouter = require('./router/box')
const collectionRouter = require('./router/collection')



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/users', userRouter)
app.use('/box', boxRouter)
app.use('/collections', collectionRouter)


app.use(session({
    secret:'webcbuef',
    cookie:{maxAge:60000},
    saveUninitialized:false,
    resave: false
}))

const PORT = process.env.port || 3000

const pathdata = path.join(__dirname,'./public')
const viewpath = path.join(__dirname,'../views')
const partialsPath = path.join(__dirname,'../partials')


app.set('view engine', 'ejs')
app.set('views', viewpath)
app.use(flash())
app.use(express.static(pathdata))
  

app.get('/', (req,res)=>{
    res.render('index')
})


app.listen(PORT, ()=>{
    console.log('server is up on port ' + PORT)
})