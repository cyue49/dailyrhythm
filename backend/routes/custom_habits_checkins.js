const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateCheckin } = require('../validations/custom_habits_checkins');
const auth = require('../middlewares/auth')

// ============================================= GET =============================================
// get all checkins for a habit
router.get('/habit/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT for_date FROM custom_habits_checkins WHERE habit_id = $1', [req.params.id], (err, result) => {
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

// get total count of checkins for a habit
router.get('/habit/:id/count', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(checkin_id) FROM custom_habits_checkins WHERE habit_id = $1', [req.params.id], (err, result) => {
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

// get all checkins between two dates for a habit
router.get('/habit/:id/from/:startDate/to/:endDate', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT for_date FROM custom_habits_checkins WHERE habit_id = $1 AND for_date >= $2 AND for_date <= $3', [req.params.id, req.params.startDate, req.params.endDate], (err, result) => {
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

// get total count of checkins for a habit for a specific day
router.get('/habit/:id/count/day/:day', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(checkin_id) FROM custom_habits_checkins WHERE habit_id = $1 AND for_date = $2', [req.params.id, req.params.day], (err, result) => {
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

// get total count of checkins for a habit between two dates
router.get('/habit/:id/count/from/:startDate/to/:endDate', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(checkin_id) FROM custom_habits_checkins WHERE habit_id = $1 AND for_date >= $2 AND for_date <= $3', [req.params.id, req.params.startDate, req.params.endDate], (err, result) => {
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
// create a checkin
router.post('/', auth, async (req, res) => {
    // input validation 
    const { error } = validateCheckin(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // generate uuid
        const checkin_id = crypto.randomUUID();

        // values to insert
        const { for_date } = req.body;
        const { habit_id } = req.body;
        const checkin_timestamp = new Date();

        // query to database
        pool.query('INSERT INTO custom_habits_checkins(checkin_id, for_date, checkin_timestamp, habit_id) VALUES ($1, $2, $3, $4)', [checkin_id, for_date, checkin_timestamp, habit_id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
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
// delete a checkin
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('DELETE FROM custom_habits_checkins WHERE checkin_id = $1', [req.params.id], (err, result) => {
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