const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const pool = require('../dbconfig');
const { validateAuth } = require('../validations/auth');
const { compare } = require('../modules/password');
const auth = require('../middlewares/auth')

// ============================================= GET =============================================
// clear cookies and logout
router.get('/signout', auth, async (req, res) => {
    res.status(200).clearCookie('token').send('success');
});

// email verification
router.get('/email/verify', async (req, res) => {
    const token = req.query.token
    res.status(200).send('Token: ' + token);
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