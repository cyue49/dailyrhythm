const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const pool = require('../dbconfig');
const { validateAuth } = require('../validations/auth');
const { compare } = require('../utils/password');
const { sendEmail } = require('../utils/email')
const auth = require('../middlewares/auth')
const crypto = require('crypto');

// ============================================= GET =============================================
// clear cookies and logout
router.get('/signout', auth, async (req, res) => {
    res.status(200).clearCookie('token').send('success');
});

// email verification
router.get('/email/verify/:token', async (req, res) => {
    try {
        pool.query('SELECT token_id, user_id, expires_on FROM verification_tokens WHERE token_id = $1', [req.params.token], (err, result) => {
            if (err) {
                console.log('Error.', err);
                res.status(400).send({ status: 'failed' });
            } else {
                // token doesn't exist
                if (result.rowCount === 0) return res.status(400).send({ status: 'failed' });

                // if token expired
                if (new Date() > new Date(result.rows[0].expires_on)) {
                    // delete token and send response
                    pool.query('DELETE FROM verification_tokens WHERE token_id = $1', [result.rows[0].token_id], (err1, result1) => {
                        if (err1) {
                            console.log('Error deleting token.', err1);
                        }
                    });
                    return res.status(400).send({ status: 'expired' });
                }

                // email verification success, update is_verified to true
                pool.query('UPDATE users SET is_verified = true WHERE user_id = $1', [result.rows[0].user_id], (err1, result1) => {
                    if (err1) {
                        console.log('Error.', err1);
                        res.status(400).send({ status: 'failed' });
                    } else {
                        // delete token and send response
                        pool.query('DELETE FROM verification_tokens WHERE token_id = $1', [result.rows[0].token_id], (err2, result2) => {
                            if (err2) {
                                console.log('Error deleting token.', err2);
                            }
                        });
                        res.status(200).send({ status: 'success' });
                    }
                })
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send({ status: 'failed' });
    }
});

// resend email verification
router.get('/email/resend/verification', auth, async (req, res) => {
    try {
        // delete all previous verification token for the user
        pool.query('DELETE FROM verification_tokens WHERE user_id = $1', [req.user_id], (error, result) => {
            if (error) {
                console.log('Error.', error);
                res.status(400).send('failed');
            } else {
                // generate a new token
                crypto.randomBytes(64, (err, buffer) => {
                    const token = buffer.toString('hex')

                    // set expiration date to a day later
                    const expire_date = new Date();
                    expire_date.setDate(expire_date.getDate() + 1)

                    // get the user email
                    pool.query('SELECT email FROM users WHERE user_id = $1', [req.user_id], (err1, result1) => {
                        if (err1) {
                            console.log('Error.', err1);
                            res.status(400).send('failed');
                        } else {
                            email = result1.rows[0].email;
                            // save token in db
                            pool.query('INSERT INTO verification_tokens (token_id, user_id, expires_on) VALUES ($1, $2, $3)', [token, req.user_id, expire_date],
                                (err2, result2) => {
                                    if (!err2) {
                                        // send verification email
                                        const verificationLink = process.env.FRONTEND_SITE + "/auth/email/verify?token=" + token
                                        const subject = "Email Verification - Daily Rhythm"
                                        const content = "Hi, here is your new email verification link. Please click on the link to verify your email: " + verificationLink
                                        sendEmail(email, subject, content);

                                        // response to client
                                        res.status(200).send('success');
                                    }
                                })
                        }
                    })
                })
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// ============================================= POST =============================================
// validate whether password is correct for user with email
router.post('/signin', async (req, res) => {
    // input validation
    const { error } = validateAuth(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    // inputs
    const { email } = req.body;
    const { user_password } = req.body;

    try {
        // query to database
        pool.query('SELECT user_password, user_id FROM users WHERE email = $1', [email], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
            } else {
                // if result array empty (non-existing email)
                if (result.rowCount === 0) {
                    return res.status(400).send('failed');
                }

                // get hashed password from db
                const hashed_password = result.rows[0].user_password;

                // compare passwords and send response
                compare(user_password, hashed_password)
                    .then((value) => {
                        if (value) {
                            // generate jwt token
                            const payload = { user_id: result.rows[0].user_id }
                            const jwtSecretKey = process.env.JWT_KEY;
                            const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '24h' });

                            // save token in cookies and send response
                            res.status(200).cookie('token', token, { httpOnly: true, secure: false, maxAge: 86400000 }).send('success');
                        } else {
                            res.status(400).send('failed');
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

// export router
module.exports = router;