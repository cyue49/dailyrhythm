const express = require('express');
const cors = require('cors');

const app = express();

// connect to database
// todo

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