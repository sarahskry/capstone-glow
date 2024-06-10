const express = require("express");
const router = express.Router();
const { addMovieToWatchedList } = require('../controllers/moviescontroller');
const { authorize } = require('../middleware/authorize');

// router.post('/watched', authorize, addMovieToWatchedList);

// // module.exports = router;



// module.exports = router;

router.post('/', authorize, (req, res) => {
    addMovieToWatchedList(req, res);
});

module.exports = router;