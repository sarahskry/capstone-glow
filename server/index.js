const express = require('express');
// const cors = requre('cors');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(cors());

app.get('/', function(req, res) {
    res.send('Welcome to /');
});

// Handle all other routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})