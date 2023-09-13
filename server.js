const express = require('express');
require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');
const User = require('./models/users');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const userController = require('./controllers/users');
const sessionsController = require('./controllers/sessions')
const PORT = process.env.PORT;
//Initialization.....
const app = express();
//Database config.....
const db = mongoose.connection;

//Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Middleware....
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
////////////////////////////////////
app.use('/users', userController);
app.use('/sessions', sessionsController);
////////////////////////////////////////
//Routes...
//Index
app.get('/', (req, res) => {
    if(req.session.currentUser){
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        })
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        })
    }
})


///////////////////////////////////
//Database Success/FAILURE messages....
db.on('connected', () => console.log('Database is connected....'.inverse.bold.white));
db.on('disconnected', () => console.log('Database disconnected'.inverse.bold.blue));
db.on('error', (err) => console.log(err.message + ' is Database connected ?'))
//Listeninig....
app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}....`.inverse.yellow);
})