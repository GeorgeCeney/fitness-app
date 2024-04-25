const express = require('express');
const pool = require('../database/db');
// const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/save-route', async (req, res) => {
    // const { start, end } = req.query;
    // const userId = req.user.user_id
    try {
    
        console.log("TESTER")
        console.log(req.body)

    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
