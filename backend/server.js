const express = require('express');
const cors = require('cors');
const pool = require('./dbconfig');

const app = express();

// connect to database
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Could not connect to PostgreSQL', err));

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// todo

// host and port
const hostname = '127.0.0.1';
const port = 5000;

// listen on port and hostname
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});