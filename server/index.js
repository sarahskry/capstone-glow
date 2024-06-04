require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const knex = require('knex');
const knexConfig = require('./knexfile');

const usersRouter = require("./routes/usersRouter");

// Initialize Knex with the development configuration
const db = knex(knexConfig);

// Create an Express app
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use('/', usersRouter);

// Handle all other routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})