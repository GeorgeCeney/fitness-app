const express = require('express');
const pool = require('../database/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/save-route', verifyToken, async (req, res) => {
    // const { start, end } = req.query;
    const userId = req.user.user_id
    const { runName, runTime, userWeight, estCaloriesBurnt, routeDistance, numLaps, route, routeImage } = req.body;

    var routeJSON = JSON.stringify(route);

    try {
        await pool.connect();
        
        await pool.query('BEGIN');

        const workoutResult = await pool.query(
            'INSERT INTO runs (user_id, run_name, run_time, run_total_distnace, number_of_laps, run_route, user_weight, estimated_calories_burnt, route_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [userId, runName, runTime, routeDistance, numLaps, routeJSON, userWeight, estCaloriesBurnt, routeImage]
        );

        await pool.query('COMMIT');

        res.status(201).send('Run added successfully.');

    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).send('Server error');
    }
});

router.get('/previous-routes', verifyToken, async (req, res) => {
    const userId = req.user.user_id

    try {
        await pool.connect();
        
        await pool.query('BEGIN');

        const previousRunsResult = await pool.query(
            'SELECT * FROM runs WHERE user_id =' + userId + ';'
        );

        await pool.query('COMMIT');

        res.status(201).json({ message: 'Runs found successfully', results: previousRunsResult.rows});

    } catch (error) {
        console.error('Error fetching previous runs:', error);
        res.status(500).send('Server error');
    }
})

module.exports = router;
