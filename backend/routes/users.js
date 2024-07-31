const express = require('express');
const router = express.Router();
const pool = require('../dbconfig');

// ============================================= GET =============================================
// get all users
router.get('/', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
            } else {
                // send response
                console.log(result.rows);
                res.status(200).send(result.rows);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// get a specific user by id
router.get('/id/:id', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users WHERE user_id = $1', [req.params.id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
            } else {
                // send response
                console.log(result.rows[0]);
                res.status(200).send(result.rows[0]);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// get a specific user by email
router.get('/email/:email', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users WHERE email = $1', [req.params.email], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
            } else {
                // send response
                console.log(result.rows[0]);
                res.status(200).send(result.rows[0]);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// get all verified users
router.get('/verified', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users WHERE is_verified = true', (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
            } else {
                // send response
                console.log(result.rows);
                res.status(200).send(result.rows);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// get all non-verified users
router.get('/notverified', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users WHERE is_verified = false', (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
            } else {
                // send response
                console.log(result.rows);
                res.status(200).send(result.rows);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// ============================================= POST =============================================


// ============================================= PUT =============================================


// ============================================= DELETE =============================================


// export router
module.exports = router;