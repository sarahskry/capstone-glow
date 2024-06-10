const express = require("express");
const router = express.Router();
const { addMovieToWatchedList } = require('../controllers/moviescontroller');
const { authorize } = require('../middleware/authorize');

// post movie from seach to watched list
router.post('/', authorize, (req, res) => {
    addMovieToWatchedList(req, res);
});

//get movies in a list
router.get('watched/list/:listId', async (req, res) => {
    const { listId } = req.params;
    try {
        const movies = await knex('ratings')
            .join('movielists', 'ratings.list_id', 'movielists.id')
            .select('ratings.movie_id')
            .where('movielists.id', listId);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch movies" });
    }
});

module.exports = router;