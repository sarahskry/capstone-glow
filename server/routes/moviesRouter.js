const express = require("express");
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const { addMovieToWatchedList } = require('../controllers/moviescontroller');
const { authorize } = require('../middleware/authorize');
const { watch } = require("fs");

// post movie from seach to watched list
router.post('/', authorize, (req, res) => {
    addMovieToWatchedList(req, res);
});

// get all watched movies
router.get('/', authorize, async (req, res) => {
    try {
        const watchedMovies = await knex('ratings')
            .select('movie_id')
            .distinct() // so if there is the same movie in two lists in only shows in the watched list once
            .where({user_id: req.user.id}); // make sure we're filtering withthe user id
            console.log(watchedMovies);
        res.json(watchedMovies);
    } catch (err) {
        console.error("Error fetching watched movies:", err);
        res.status(500).json({ error: err.message });
    }
});

// get user's lists
router.get('/lists', authorize, async (req, res) => {
    try {
        // console.log('Fetching lists for user:', req.user.id);
        const lists = await knex('movielists')
        .where({ user_id: req.user.id });
        // console.log('lists fetched:', lists);
        res.json(lists);
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message });
    }
});

//get movies in a list
router.get('/lists/:id/movies', authorize, async (req, res) => {
    try {
        const movies = await knex('ratings')
            .where({ list_id: req.params.id });
        res.json(movies);
    } catch {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;