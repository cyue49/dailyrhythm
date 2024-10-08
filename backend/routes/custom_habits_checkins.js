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

// get total count of distinct days checked-in for a habit
router.get('/habit/:id/count/days', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(DISTINCT for_date) FROM custom_habits_checkins WHERE habit_id = $1', [req.params.id], (err, result) => {
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

// get total count of checkins for all active habits in a category
router.get('/category/:id/count', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(CI.checkin_id) FROM custom_habits_checkins CI JOIN custom_habits CH ON CI.habit_id = CH.habit_id JOIN categories CAT ON CH.category_id = CAT.category_id WHERE CAT.category_id = $1 AND CH.is_active = true', [req.params.id], (err, result) => {
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

// get total count of distinct days checked-in for all active habits in a category
router.get('/category/:id/count/days', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(DISTINCT CI.for_date) FROM custom_habits_checkins CI JOIN custom_habits CH ON CI.habit_id = CH.habit_id JOIN categories CAT ON CH.category_id = CAT.category_id WHERE CAT.category_id = $1 AND CH.is_active = true', [req.params.id], (err, result) => {
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

// get total checkin count for a category for a specific day
router.get('/category/:id/count/day/:day', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(CI.checkin_id) FROM custom_habits_checkins CI JOIN custom_habits CH ON CI.habit_id = CH.habit_id JOIN categories CAT ON CH.category_id = CAT.category_id WHERE CAT.category_id = $1 AND CI.for_date = $2 AND CH.is_active = true', [req.params.id, req.params.day], (err, result) => {
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

// get count of all checkins between two dates for a category
router.get('/category/:id/count/from/:startDate/to/:endDate', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT COUNT(CI.checkin_id) FROM custom_habits_checkins CI JOIN custom_habits CH ON CI.habit_id = CH.habit_id JOIN categories CAT ON CH.category_id = CAT.category_id WHERE CAT.category_id = $1 AND CH.is_active = true AND CI.for_date >= $2 AND CI.for_date <= $3', [req.params.id, req.params.startDate, req.params.endDate], (err, result) => {
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

// delete the last checkin for habit on a specific date
router.delete('/delete/habit/:id/date/:date', auth, async (req, res) => {
    try {
        pool.query('SELECT checkin_id, for_date, checkin_timestamp FROM custom_habits_checkins WHERE habit_id = $1 AND for_date = $2 ORDER BY checkin_timestamp DESC', [req.params.id, req.params.date], (err, result) => {
            if (err) {
                console.log('Error deleting item.', err);
                res.status(400).send('failed');
            } else {
                // if no checkin on that date return
                if (result.rowCount === 0) return res.status(200).send('success');

                // delete the one with the latest timestamp
                const latest = result.rowCount - 1
                const latestID = result.rows[latest].checkin_id

                pool.query('DELETE FROM custom_habits_checkins WHERE checkin_id = $1', [latestID], (err1, result1) => {
                    if (err1) {
                        console.log('Error deleting item.', err1);
                        res.status(400).send('failed');
                    } else {
                        // send response
                        res.status(200).send('success');
                    }
                })
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
})

// export router
module.exports = router;