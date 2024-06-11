const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('node:fs');
const knex = require('knex')(require('../knexfile'));
const { authorize } = require('../middleware/authorize');


const router = express.Router();


/******************* REGISTER *******************/
router.post('/register', async (req, res) => {
    // grab name, username, email and pass
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).send("All fields are required");
    }

    // encrypt password
    const encrypted = bcrypt.hashSync(password);

    try {
        const [userId] = await knex('users').insert({
            name, 
            email,
            username,
            password: encrypted,
        })

        // Create default 'watch' list for the new user
        await knex('movielists').insert({
            list_title: 'Watched',
            user_id: userId,
        });

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


// /******************* MIDDLEWARE/Dashboard *******************/
// // call the 'authorize' as middleware function
// // it will add the 'user' property to the 'req' object
router.get('/dashboard', authorize, async (req, res) => {

    const lists = await knex('movielists').where({ user_id: req.user.id });

    const response = {
        user: req.user,
        lists
    }
    
    res.json(response);
});

router.get('/list/:id', authorize, async (req, res) => {

    const ratings = await knex('ratings').where({list_id: req.params.id});

    // make movie API calls for the movie data, and send...
    
    res.json(ratings);
});


module.exports = router;