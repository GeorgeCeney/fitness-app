const express = require('express');
const pool = require('../database/db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/setGoal', verifyToken, async (req, res) => {
    try {
        const {
            start_weight,
            current_weight,
            goal_weight,
            weekly_goal,
            activity_level,
            calories_goal,
            protein_goal,
            carbs_goal,
            fats_goal
        } = req.body;
        const userID = req.user.user_id;
        
        const goalSettingQuery = {
            text: 'INSERT INTO goals (user_id, start_weight, current_weight, goal_weight, weekly_goal, activity_level, calories_goal, protein_goal, carbs_goal, fat_goal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
            values: [userID, start_weight, current_weight, goal_weight, weekly_goal, activity_level, calories_goal, protein_goal, carbs_goal, fats_goal]
        };
        console.log(goalSettingQuery)
        
        // Executing the query
        await pool.query(goalSettingQuery);

        res.status(200).send('Goal set successfully');
    } catch (error) {
        console.error("Error Setting goals", error);
        res.status(500).send('Server error');
    }
});

router.get('/getGoals', verifyToken, async(req, res) =>{
    try{
    const userID = req.user.user_id;
    const getGoalsQuery = {
        text: 'select * from goals where user_id =$1 ;',
        values: [userID]
    }
    const { rows } = await pool.query(getGoalsQuery);
    res.json(rows)
    }catch (error){
        console.error("Error Getting Goals", error);
        res.status(500).send('Server error, could not get Goals');
    }
})

router.post('/updateDiary', verifyToken, async (req, res) => {
    try{
        const {
            date,
            meal,
            food_name,
            food_calories,
            food_serving,
            food_carbs,
            food_protein,
            food_fat
        } = req.body

        const userID = req.user.user_id;
        const diaryUpdatingQuery = {
            text: 'insert into diary (user_id, date, meal, food_name, food_serving, food_calories, food_carbs, food_protein, food_fat) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
            values: [userID, date, meal, food_name, food_serving, food_calories, food_carbs, food_protein, food_fat]
        }
        await pool.query(diaryUpdatingQuery);

        res.status(200).send('Diary Updated successfully');

    }catch(error){
        console.error("An Error Has occured When updating Diary, error");
        res.status(500).send('Server error, could not update Diary');
    }
})

router.get('/getDiary',verifyToken, async (req, res) =>{
    try{
        const userID = req.user.user_id;
        const { date } = req.query; 

        const getDiaryQuery = {
            text: 'select * from diary where user_id = $1 and date = $2 ;',
            values: [userID, date]
        }
        const { rows } = await pool.query(getDiaryQuery);
        console.log(rows)
        res.json(rows)
    }catch(error){
        console.error('Could not get diary',error);
        res.status(500).send('Server error, could not get Diary');
    }
})

module.exports = router;
