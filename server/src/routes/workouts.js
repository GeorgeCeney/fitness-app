const express = require('express');
const pool = require('../database/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const { start, end } = req.query;
  const userId = req.user.user_id
  try {
    const workouts = await pool.query(`
      SELECT 
        w.workout_id, 
        w.workout_name, 
        w.notes, 
        w.start_time, 
        w.end_time,
        json_agg(
          json_build_object(
            'exercise_id', e.exercise_id,
            'exercise_name', e.exercise_name,
            'sets', we.sets,
            'reps', we.reps,
            'weight', we.weight
          )
        ) as exercises
      FROM workouts w
      LEFT JOIN workout_exercises we ON w.workout_id = we.workout_id
      LEFT JOIN exercises e ON we.exercise_id = e.exercise_id
      WHERE w.user_id = $1 AND w.start_time >= $2 AND w.end_time <= $3
      GROUP BY w.workout_id
      ORDER BY w.start_time
    `, [userId, start, end]);
    res.json(workouts.rows);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).send('Server error');
  }
});

router.post('/create', verifyToken, async (req, res) => {
  const { workoutName, startTime, endTime, exercises, notes } = req.body;
  const userId = req.user.user_id;

  try {
    await pool.connect();

    await pool.query('BEGIN');

    const workoutResult = await pool.query(
      'INSERT INTO workouts (user_id, workout_name, start_time, end_time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING workout_id',
      [userId, workoutName, startTime, endTime, notes]
    );
    const workoutId = workoutResult.rows[0].workout_id;

    for (const exercise of exercises) {
      let exerciseId;

      const exerciseResult = await pool.query('SELECT exercise_id FROM exercises WHERE exercise_name = $1', [exercise.exerciseId]);
      if (exerciseResult.rows.length > 0) {
        exerciseId = exerciseResult.rows[0].exercise_id;
      } else {

        const newExerciseResult = await pool.query('INSERT INTO exercises (exercise_name) VALUES ($1) RETURNING exercise_id', [exercise.exerciseId]);
        exerciseId = newExerciseResult.rows[0].exercise_id;
      }

 
      await pool.query(
        'INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, weight) VALUES ($1, $2, $3, $4, $5)',
        [workoutId, exerciseId, exercise.sets, exercise.reps, exercise.weight]
      );
    }

    await pool.query('COMMIT');

    res.status(201).json({ message: 'Workout and exercises added successfully.' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error in transaction', error.stack);
    res.status(500).send('Error creating workout');
  }
});

module.exports = router;
