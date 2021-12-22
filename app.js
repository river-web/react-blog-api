const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating an express app
const app = express();
app.use(cors());

// Configure Port No:
const port = 5500;

// Database
mongoose.connect('mongodb://localhost/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Blog API');
});

const BlogRoutes = require('./routes/Blogs.route');
app.use('/blogs', BlogRoutes);

// Starting Server
app.listen(port, console.log(`Listening on port '${port}'...`));