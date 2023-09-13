const express = require('express');
const sessionsRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');



//New(login Page)...
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

//Delete(logout route)...
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})


//Create(login route)...
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then((foundUser) => {
        if(!foundUser){
            res.send('Email address not registered')
        } else {
            const samePassword = bcrypt.compareSync(req.body.password, foundUser.password);

            if(samePassword){
                req.session.currentUser = foundUser
                res.redirect('/')
            } else {
                res.send("Wrong Password")
            }
        }
    })
    .catch((error) => {
        res.status(500).json({"message": error})
    })
})


module.exports = sessionsRouter;