const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const pool = require('../dbconfig');
const { validateCategory } = require('../validations/categories');
const auth = require('../middlewares/auth')

// ============================================= GET =============================================
// get all categories for a user
router.get('/me', auth, async (req, res) => {
    try {
        // query to database
        pool.query('SELECT category_id, category_name FROM categories WHERE user_id = $1', [req.user_id], (err, result) => {
            if (err) {
                console.log('Error executing query.', err);
                res.status(400).send('failed');
            } else {
                // send response
                console.log(result.rows[0]);
                res.status(200).send(result.rows);
            }
        })
    } catch (e) {
        console.log(e.message);
        res.status(400).send('failed');
    }
});

// ============================================= POST =============================================
// add a category for a user
router.post('/', auth, async (req, res) => {
    // input validation 
    const { error } = validateCategory(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // generate uuid
        const category_id = crypto.randomUUID();

        // values to insert
        const { category_name } = req.body;

        // query to database
        pool.query('INSERT INTO categories(category_id, category_name, user_id) VALUES ($1, $2, $3)', [category_id, category_name, req.user_id], (err, result) => {
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

// ============================================= PUT =============================================
// update a category name
router.put('/me/edit/:id', auth, async (req, res) => {
    // input validation 
    const { error } = validateCategory(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send('failed');
    }

    try {
        // value to update
        const { category_name } = req.body;

        // update in the database
        pool.query('UPDATE categories SET category_name = $1 WHERE category_id = $2', [category_name, req.params.id], (err, result) => {
            if (err) {
                console.log('Error updating category.', err);
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
// delete a category
router.delete('/me/delete/:id', auth, async (req, res) => {
    try {
        // query to database
        pool.query('DELETE FROM categories WHERE category_id = $1', [req.params.id], (err, result) => {
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