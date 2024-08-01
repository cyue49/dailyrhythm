const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateNew, validateUpdate } = require('../validations/users');
const { hash, compare } = require('../modules/password');

// ============================================= GET =============================================
// get all users
router.get('/', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
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
                res.status(400).send('failed');
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
                res.status(400).send('failed');
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
                res.status(400).send('failed');
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
                res.status(400).send('failed');
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

// get a user's settings
router.get('/id/:id/settings', async (req, res) => {
    try {
        // query to database
        pool.query('SELECT * FROM settings WHERE user_id = $1', [req.params.id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
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

// ============================================= POST =============================================
// create a new user
router.post('/', async (req, res) => {
    // input validation 
    const { error } = validateNew(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // generate uuids
        const user_id = crypto.randomUUID();
        const settings_id = crypto.randomUUID();

        // values to insert
        const { email } = req.body;
        const { username } = req.body;
        const { user_password } = req.body;
        const created_on = new Date();
        const hashed_password = await hash(user_password); 

        // create and insert new user into db
        pool.query('INSERT INTO users(user_id, email, username, user_password, created_on) VALUES ($1, $2, $3, $4, $5)', [user_id, email, username, hashed_password, created_on],
            (err, result) => {
                if (err) {
                    console.log('Error creating new user.', err);
                    res.status(400).send('failed');
                } else {
                    // create and insert new settings for user into db
                    pool.query('INSERT INTO settings (settings_id, user_id) VALUES ($1, $2)', [settings_id, user_id],
                        (err1, result1) => {
                            if (err1) {
                                console.log('Error creating new settings.', err);
                                res.status(400).send('failed');
                            } else {
                                // send response
                                res.status(200).send('success');
                            }
                        }
                    );
                }
            });
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// ============================================= PUT =============================================
// update a user's username
router.put('/id/:id/username', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'username')
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // value to update
        const { username } = req.body;

        // update in the database
        pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating username.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// update a user's profile image url
router.put('/id/:id/imageurl', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'imageurl')
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // value to update
        const { image_url } = req.body;

        // update in the database
        pool.query('UPDATE users SET image_url = $1 WHERE user_id = $2', [image_url, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating image url.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// update a user's email
router.put('/id/:id/email', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'email')
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // value to update
        const { email } = req.body;

        // update in the database
        pool.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating image url.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// update a user's password
router.put('/id/:id/password', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'password')
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // value to update
        const { user_password } = req.body;

        // update in the database
        pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [user_password, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating image url.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// update a user's is verified
router.put('/id/:id/verified', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'verified')
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // value to update
        const { is_verified } = req.body;

        // update in the database
        pool.query('UPDATE users SET is_verified = $1 WHERE user_id = $2', [is_verified, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating image url.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

// ============================================= DELETE =============================================


// export router
module.exports = router;