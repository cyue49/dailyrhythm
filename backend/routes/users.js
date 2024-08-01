const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateNew, validateUpdate } = require('../validations/users');
const { hash } = require('../modules/password');

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
        res.status(400).send('failed');
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
        res.status(400).send('failed');
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
        res.status(400).send('failed');
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
        res.status(400).send('failed');
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
        res.status(400).send('failed');
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
        res.status(400).send('failed');
    }
});

// ============================================= POST =============================================
// create a new user
router.post('/', async (req, res) => {
    // input validation 
    const { error } = validateNew(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

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
                                // if error, delete newly created user entry from db
                                pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);

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
        res.status(400).send('failed');
    }
});

// ============================================= PUT =============================================
// update a user's username
router.put('/id/:id/username', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'username')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

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
        res.status(400).send('failed');
    }
});

// update a user's profile image url
router.put('/id/:id/imageurl', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'imageurl')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

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
        res.status(400).send('failed');
    }
});

// update a user's email
router.put('/id/:id/email', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'email')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { email } = req.body;

        // update in the database
        pool.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating email.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update a user's password
router.put('/id/:id/password', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'password')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { user_password } = req.body;

        // update in the database
        pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [user_password, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating password.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update a user's is verified
router.put('/id/:id/verified', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'verified')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { is_verified } = req.body;

        // update in the database
        pool.query('UPDATE users SET is_verified = $1 WHERE user_id = $2', [is_verified, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating verified status.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update the app theme in user settings
router.put('/id/:id/theme', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'theme')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { theme } = req.body;

        // update in the database
        pool.query('UPDATE settings SET theme = $1 WHERE user_id = $2', [theme, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating user settings.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update the time the day starts in user settings
router.put('/id/:id/timedaystarts', async (req, res) => {
    // input validation
    const { error } = validateUpdate(req.body, 'time')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { time_day_starts } = req.body;

        // update in the database
        pool.query('UPDATE settings SET time_day_starts = $1 WHERE user_id = $2', [time_day_starts, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating user settings.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// ============================================= DELETE =============================================
router.delete('/id/:id', async (req, res) => {
    try {
        // query to database
        pool.query('DELETE FROM users WHERE user_id = $1', [req.params.id], (err, result) => {
            if (err) {
                console.log('Error deleting item.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send('success');
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// export router
module.exports = router;