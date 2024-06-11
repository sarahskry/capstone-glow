const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('node:fs');
const knex = require('knex')(require('../knexfile'));

const router = express.Router();

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

module.exports = { router, authorize };