const express = require('express');
const userRouter = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');



//New(registration Page).....
userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.body.currentUser
    })
})

//Create(registration route)...
userRouter.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body)
    .then((createdUser) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(500).send({message: 'Error Creating User'})
    })
})

module.exports = userRouter;