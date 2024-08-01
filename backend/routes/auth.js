const express = require('express');
const router = express.Router();
const pool = require('../dbconfig');
const { validateAuth } = require('../validations/auth');
const { compare } = require('../modules/password');

// ============================================= POST =============================================
// validate whether password is correct for user with email
router.post('/', async (req, res) => {
    // input validation
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // inputs
    const { email } = req.body;
    const { user_password } = req.body;
    
    try {
        // query to database
        pool.query('SELECT user_password FROM users WHERE email = $1', [email], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
            } else {
                // hashed password from db
                const hashed_password = result.rows[0].user_password;

                // compare passwords and send response
                compare(user_password, hashed_password)
                .then((value) => res.status(200).send(value))
                .catch((error) => {
                    console.log(error.message);
                    res.status(400).send(false);
                });
            }
        });
    } catch (e) {
        console.log(e.message);
        res.status(400).send(false);
    }
});

// export router
module.exports = router;