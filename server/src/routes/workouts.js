// /server/src/routes/workouts.js
const express = require('express');
const pool = require('../database/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.user_id;

  const query = `
    SELECT w.workout_id, w.workout_date, w.workout_name, w.notes as workout_notes, w.created_at as workout_created_at,
            we.workout_exercise_id, we.sets, we.reps, we.weight, we.notes as exercise_notes,
            e.exercise_id, e.exercise_name, e.description
    FROM workouts w
    INNER JOIN workout_exercises we ON w.workout_id = we.workout_id
    INNER JOIN exercises e ON we.exercise_id = e.exercise_id
    WHERE w.user_id = $1
    ORDER BY w.workout_date DESC, we.workout_exercise_id;
  `;

  try {
    const result = await pool.query(query, [userId]);
    // Format the results to group by workout
    const workouts = result.rows.reduce((acc, row) => {
      // If the workout hasn't been added to the accumulator, add it
      if (!acc[row.workout_id]) {
        acc[row.workout_id] = {
          workout_id: row.workout_id,
          workout_date: row.workout_date,
          workout_name: row.workout_name,
          workout_notes: row.workout_notes,
          workout_created_at: row.workout_created_at,
          exercises: []
        };
      }
      // Add the exercise to the workout's exercises array
      acc[row.workout_id].exercises.push({
        workout_exercise_id: row.workout_exercise_id,
        sets: row.sets,
        reps: row.reps,
        weight: row.weight,
        exercise_notes: row.exercise_notes,
        exercise_id: row.exercise_id,
        exercise_name: row.exercise_name,
        description: row.description
      });
      return acc;
    }, {});

    // Convert the workouts object back into an array
    const workoutsArray = Object.values(workouts);
    res.json(workoutsArray);
  } catch (error) {
    console.error('Error fetching workouts with exercises:', error);
    res.status(500).send({ message: 'Error fetching workouts with exercises' });
  }
});

router.post('/create', verifyToken, async (req, res) => {
  const userId = req.user.user_id;
  const { workoutName, startTime, endTime, activity, sets, reps, weight, notes } = req.body;
  try {
    const newWorkout = await pool.query(
      'INSERT INTO workouts (user_id, workout_name, notes, start_time, end_time ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, workoutName, notes, startTime, endTime]
    );

    const newWorkoutExercise = await pool.query(
      'INSERT INTO workout_exercises (workout_id, exercise_id'
    )

    res.json(newWorkout.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
