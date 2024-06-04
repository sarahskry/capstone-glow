const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('node:fs');
const knex = require('knex')(require('../knexfile'));

const router = express.Router();

/******************* REGISTER *******************/
router.post('/register', async (req, res) => {
    // grab name, username, email and pass
    const { name, username, email, password } = req.body;

    // encrypt password
    const encrypted = bcrypt.hashSync(password);

    try {
        await knex('users').insert({ name, username, email, password: encrypted });
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err.code);
        switch (err.code) {
            case "ER_DUP_ENTRY":
                res.status(400).send("the username already exists");
                break;
            default:
                res.status(500).send("something went wrong");
        }
    }
});


/******************* LOGIN *******************/
router.post('/login', async (req, res) => {
    // grab the username and password
    const { username, password } = req.body;

    try {
        // find the user in the db
        const user = await knex('users').where({ username }).first();
        // response if there is no user
        if (!user) {
            return res.status(400).send("username or password is incorrect");
        }
    
        // validate password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send("username or password is incorrect");
        }
    
        // generate token, we are encoding the username in the token that will be decoded later
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
    
        // respond with token
        res.json({ token });
    } catch (err) {
        res.status(401).send("login failed")
    }
});

/******************* MIDDLEWARE/Dashboard *******************/
// call the 'authorize' as middleware function
// it will add the 'user' property to the 'req' object
router.get('/dashboard', authorize, (req, res) => {
    res.json(req.user);
});

async function authorize(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    try {
        // decode the payload, get the 'username' back
        // if something goes wrong here, it will cause an error and we'll be in the catch clause
        const { username } = jwt.verify(token, process.env.SECRET);

        // find the user with the matching username from the jwt payload
        const user = await knex('users').select('id', 'username').where({ username }).first();

        // add the user to the req object
        req.user = user;

        // next
        next();
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

module.exports = router;