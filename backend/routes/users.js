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

// ============================================= POST =============================================


// ============================================= PUT =============================================


// ============================================= DELETE =============================================


// export router
module.exports = router;