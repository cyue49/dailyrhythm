const dotenv = require('dotenv')
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pool = require('./dbconfig');
const users = require('./routes/users')
const auth = require('./routes/auth')
const categories = require('./routes/categories')
const custom_habits = require('./routes/custom_habits')
const custom_habits_checkins = require('./routes/custom_habits_checkins')

dotenv.config();

const app = express();

// connect to database
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Could not connect to PostgreSQL', err));

// middleware
app.use(cors({
    origin: process.env.FRONTEND_SITE,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/custom_habits', custom_habits);
app.use('/api/custom_habits_checkins', custom_habits_checkins);

// host and port
const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

// listen on port and hostname
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});