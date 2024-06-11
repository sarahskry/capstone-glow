const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

// get the watched list id for a user
const getWatchedListId = async (userId) => {
    const list = await db('movielists')
        .select('id')
        .where({ user_id: userId, list_title: 'Watched' })
        .first();
    return list ? list.id : null;
};

const addMovieToWatchedList = async (req, res) => {

    try {
        const { movie_id } = req.body;
        const userId = req.user.id;

        const watchedListId = await getWatchedListId(userId);

        if (!watchedListId) {
            return res.status(400).json({ error: "Watched list not found for user"}); //should never see this error as upon registration and login a watched list is created for user
        }
        console.log(watchedListId);
        console.log(userId);
        //Insert movie into ratings table
        await db('ratings').insert({
            user_id: userId,
            movie_id: movie_id,
            list_id: watchedListId,
        });

        res.status(201).json({ message: "Movie added to watched list" });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add movie to watched list" });
    }
};

module.exports = {
    addMovieToWatchedList
};