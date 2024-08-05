const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateUser } = require('../validations/users');
const { hash, compare } = require('../modules/password');
const auth = require('../middlewares/auth')

// ============================================= GET =============================================
// get the current user
router.get('/me', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT email, username, is_verified, image_url, created_on FROM users WHERE user_id = $1', [req.user_id], (err, result) => {
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

// get a user's settings
router.get('/me/settings', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT theme, time_day_starts FROM settings WHERE user_id = $1', [req.user_id], (err, result) => {
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
router.post('/signup', async (req, res) => {
    // input validation 
    const { error } = validateUser(req.body, 'new');
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
                                // generate jwt token
                                const payload = { user_id: user_id }
                                const jwtSecretKey = config.get('App.jwtPrivateKey');
                                const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '24h' });

                                // send response
                                res.status(200).cookie('token', token, { httpOnly: true, secure: false, maxAge: 86400000 }).send('success');
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
router.put('/me/edit/username', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'username')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { username } = req.body;

        // update in the database
        pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, req.user_id], (err, result) => {
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
router.put('/me/edit/imageurl', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'imageurl')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { image_url } = req.body;

        // update in the database
        pool.query('UPDATE users SET image_url = $1 WHERE user_id = $2', [image_url, req.user_id], (err, result) => {
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
router.put('/me/edit/email', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'email')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { email } = req.body;

        // update in the database
        pool.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, req.user_id], (err, result) => {
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
router.put('/me/edit/password', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'password')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // old & new passwords 
        const { old_password } = req.body;
        const { new_password } = req.body;

        // verify if old password is valid
        pool.query('SELECT user_password FROM users WHERE user_id = $1', [req.user_id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
            } else {
                // hashed password from db
                const hashed_password = result.rows[0].user_password;

                // compare old passwords 
                compare(old_password, hashed_password)
                    .then((value) => {
                        if (value) {
                            // hash new password
                            hash(new_password)
                                .then((value2) => {
                                    const new_hashed_password = value2;

                                    // update in the database
                                    pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [new_hashed_password, req.user_id], (err, result) => {
                                        if (err) {
                                            console.log('Error updating password.', err);
                                            res.status(400).send('failed');
                                        } else {
                                            // send response
                                            res.status(200).send('success');
                                        }
                                    })
                                })
                                .catch((error2) => {
                                    console.log(error2.message);
                                    res.status(400).send('failed');
                                })
                        } else {
                            res.status(400).send('wrong password');
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                        res.status(400).send('failed');
                    });
            }
        });
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update a user's is verified
router.put('/me/edit/verified', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'verified')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { is_verified } = req.body;

        // update in the database
        pool.query('UPDATE users SET is_verified = $1 WHERE user_id = $2', [is_verified, req.user_id], (err, result) => {
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
router.put('/me/edit/theme', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'theme')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { theme } = req.body;

        // update in the database
        pool.query('UPDATE settings SET theme = $1 WHERE user_id = $2', [theme, req.user_id], (err, result) => {
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
router.put('/me/edit/timedaystarts', auth, async (req, res) => {
    // input validation
    const { error } = validateUser(req.body, 'time')
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { time_day_starts } = req.body;

        // update in the database
        pool.query('UPDATE settings SET time_day_starts = $1 WHERE user_id = $2', [time_day_starts, req.user_id], (err, result) => {
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