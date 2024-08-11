const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateHabit } = require('../validations/custom_habits');
const auth = require('../middlewares/auth')

// ============================================= GET =============================================
// get all active habits for current user
router.get('/active', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT C.habit_id, C.habit_name, C.habit_description, C.frequency_count, C.frequency_type, C.weekdays, C.created_on, C.category_id FROM custom_habits C JOIN categories Cat ON C.category_id = Cat.category_id JOIN users U ON Cat.user_id = U.user_id WHERE U.user_id = $1 AND C.is_active = TRUE', [req.user_id], (err, result) => {
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

// get all active habits for current user for a category
router.get('/active/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT C.habit_id, C.habit_name, C.habit_description, C.frequency_count, C.frequency_type, C.weekdays, C.created_on, C.category_id FROM custom_habits C JOIN categories Cat ON C.category_id = Cat.category_id JOIN users U ON Cat.user_id = U.user_id WHERE U.user_id = $1 AND C.is_active = TRUE AND C.category_id = $2', [req.user_id, req.params.id], (err, result) => {
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

// get all archived habits for current user
router.get('/archived', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT C.habit_id, C.habit_name, C.habit_description, C.frequency_count, C.frequency_type, C.weekdays, C.created_on, C.category_id FROM custom_habits C JOIN categories Cat ON C.category_id = Cat.category_id JOIN users U ON Cat.user_id = U.user_id WHERE U.user_id = $1 AND C.is_active = FALSE', [req.user_id], (err, result) => {
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

// get all active habits where weekday includes today for current user
router.get('/active/today/:day', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT C.habit_id, C.habit_name, C.habit_description, C.frequency_count, C.frequency_type, C.weekdays, C.created_on, C.category_id FROM custom_habits C JOIN categories Cat ON C.category_id = Cat.category_id JOIN users U ON Cat.user_id = U.user_id WHERE U.user_id = $1 AND C.is_active = TRUE AND C.weekdays LIKE \'%\' || $2 || \'%\'', [req.user_id, req.params.day], (err, result) => {
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

// get all active habits where weekday includes today for current user for a category
router.get('/active/today/:day/category/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT C.habit_id, C.habit_name, C.habit_description, C.frequency_count, C.frequency_type, C.weekdays, C.created_on, C.category_id FROM custom_habits C JOIN categories Cat ON C.category_id = Cat.category_id JOIN users U ON Cat.user_id = U.user_id WHERE U.user_id = $1 AND C.is_active = TRUE AND C.weekdays LIKE \'%\' || $2 || \'%\' AND C.category_id = $3', [req.user_id, req.params.day, req.params.id], (err, result) => {
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

// ============================================= POST =============================================
// create a new habit 
router.post('/', auth, async (req, res) => {
    // input validation 
    const { error } = validateHabit(req.body, 'general');
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // generate uuid
        const habit_id = crypto.randomUUID();

        // values to insert
        const { habit_name } = req.body;
        const { habit_description } = req.body;
        const { frequency_count } = req.body;
        const { frequency_type } = req.body;
        const { weekdays } = req.body;
        const { category_id } = req.body;
        const created_on = new Date();

        // query to database
        pool.query('INSERT INTO custom_habits(habit_id, habit_name, habit_description, frequency_count, frequency_type, weekdays, created_on, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [habit_id, habit_name, habit_description, frequency_count, frequency_type, weekdays, created_on, category_id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send(result.rows[0]);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// ============================================= PUT =============================================
// update general info for a habit
router.put('/edit/:id', auth, async (req, res) => {
    // input validation 
    const { error } = validateHabit(req.body, 'general');
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // values to update
        const { habit_name } = req.body;
        const { habit_description } = req.body;
        const { frequency_count } = req.body;
        const { frequency_type } = req.body;
        const { weekdays } = req.body;
        const { category_id } = req.body;

        // update in the database
        pool.query('UPDATE custom_habits SET habit_name = $1, habit_description = $2, frequency_count = $3, frequency_type = $4, weekdays = $5, category_id = $6 WHERE habit_id = $7 RETURNING *', [habit_name, habit_description, frequency_count, frequency_type, weekdays, category_id, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating habit.', err);
                res.status(400).send('failed');
            } else {
                // send response
                res.status(200).send(result.rows[0]);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// update a habit's is active status
router.put('/edit/active/:id', auth, async (req, res) => {
    // input validation 
    const { error } = validateHabit(req.body, 'active');
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { is_active } = req.body;

        // update in the database
        pool.query('UPDATE custom_habits SET is_active = $1 WHERE habit_id = $2', [is_active, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating habit.', err);
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
// delete a habit
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('DELETE FROM custom_habits WHERE habit_id = $1', [req.params.id], (err, result) => {
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