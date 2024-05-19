import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from "../AuthContext/AuthContext";
import axios from 'axios';

const UpdateGoalsModal = ({ show, handleClose }) => {
    const { token } = useAuth();
    const [goalsData, setGoalsData] = useState({ startingWeight: '', currentWeight: '', goalWeight: '', weeklyGoal: '', activityLevel: '' });
    const startingWeightRef = useRef(null);
    const currentWeightRef = useRef(null);
    const weeklyGoalRef = useRef(null);
    const goalWeightRef = useRef(null);
    const activityLevelRef = useRef(null);
    const navigate = useNavigate();
    const [goalData, setGoalData] = useState([{

    }]);


    useEffect(() => {
        const fetchGoalData = async () => {
            console.log("Update Goals Modal Running")
          const backendUrl = "http://localhost:3001/calories/getGoals";
          try {
            const response = await axios.get(backendUrl, {
              headers: {
                Authorization: `${token}`
              }
            });
            const responseData = response.data
            console.log(response.data)
            setGoalData(responseData[response.data.length - 1]);
            console.log(responseData[response.data.length - 1]);
  
          } catch (error) {
            console.error('Error fetching goal data:', error);
            alert("Please Login!");
            navigate('/');
          }
        };
    
        fetchGoalData(); 
        // IF GOAL DATA IS NULLL FIX IT UP
    
    
      }, [show]);

    const handleChange = () => {
        const newData = {
            startingWeight: startingWeightRef.current.value,
            currentWeight: currentWeightRef.current.value,
            goalWeight: goalWeightRef.current.value,
            weeklyGoal: weeklyGoalRef.current.value,
            activityLevel: activityLevelRef.current.value
        };

        setGoalsData(newData);
        console.log(goalsData)
    };

    const handleSubmit = async () => {
        const newData = {
            startingWeight: startingWeightRef.current.value,
            currentWeight: currentWeightRef.current.value,
            goalWeight: goalWeightRef.current.value,
            weeklyGoal: weeklyGoalRef.current.value,
            activityLevel: activityLevelRef.current.value
        };
        
        setGoalsData(newData);
        console.log(goalsData)
        handleClose()

        // BMR Formula:
        //The Mifflin - St Jeor BMR bmw formula - souce https://www.thecalculatorsite.com/articles/health/bmr-formula.php
        let user_bmr = 0;

        // Calculate BMR based on Mifflin-St Jeor equation
        user_bmr = (15 * newData.currentWeight) + (6.25 * 180) - (5 * 20) + 5;

        // Adjust BMR based on weekly goal
        switch (newData.weeklyGoal) {
            case "lose1":
                user_bmr -= 1000;
                break;
            case "lose05":
                user_bmr -= 500;
                break;
            case "maintain":
                break;
            case "gain025":
                user_bmr += 250;
                break;
            case "gain05":
                user_bmr += 500;
                break;
        }

        // Adjust BMR based on activity level
        switch (newData.activityLevel) {
            case "notActive":
                user_bmr *= 0.9;
                break;
            case "lightlyActive":
                user_bmr *= 1.1;
                break;
            case "active":
                user_bmr *= 1.2;
                break;
            case "veryActive":
                user_bmr *= 1.3;
                break;
        }
        console.log("The Users BMR = " + user_bmr)
        const carbs_goal = (user_bmr*0.5)/4
        const protein_goal = (user_bmr*0.3)/4
        const fat_goal = (user_bmr*0.3)/9

        // SEND API Request to parse through DATA
        const backendUrl = "http://localhost:3001/calories/setGoal";
        try {
            const response = await axios.post(backendUrl, {
                start_weight: newData.startingWeight,
                current_weight: newData.currentWeight,
                goal_weight: newData.goalWeight,
                weekly_goal: newData.weeklyGoal,
                activity_level: newData.activityLevel,
                calories_goal: user_bmr,
                protein_goal: protein_goal,
                carbs_goal: carbs_goal,
                fats_goal: fat_goal
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log('Data saved:', response.data);
        } catch (error) {
            console.error('Error saving workout:', error.response.data);
        }

    }
    console.log()

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Starting Weight</Form.Label>
                    <Form.Control ref={startingWeightRef} onChange={handleChange} type="number" defaultValue = {goalData.start_weight} />
                    <Form.Label>Current Weight</Form.Label>
                    <Form.Control ref={currentWeightRef} onChange={handleChange} type="number" defaultValue = {goalData.current_weight} />
                    <Form.Label>Goal Weight</Form.Label>
                    <Form.Control id="goalWeight" type="number" ref={goalWeightRef} onChange={handleChange} defaultValue = {goalData.goal_weight} />
                    <Form.Label>Weekly Goal</Form.Label>
                    <Form.Select onChange={handleChange} ref={weeklyGoalRef} defaultValue={goalData.weekly_goal}>
                        <option value="">Set Weekly Goal</option>
                        <option value="lose1">Lose 1 Kg/Week</option>
                        <option value="lose05">Lose 0.5 Kg/Week</option>
                        <option value="maintain">Maintain Weight</option>
                        <option value="gain025">Gain 0.25 Kg/Week</option>
                        <option value="gain05">Gain 0.5 Kg/Week</option>
                    </Form.Select>
                    <Form.Label>Activity Level</Form.Label>
                    <Form.Select onChange={handleChange} ref={activityLevelRef} defaultValue={goalData.activity_level}>
                        <option value="">Set Activity Level</option>
                        <option value="notActive">Not Very Active</option>
                        <option value="lightActive">Lightly Active</option>
                        <option value="active">Active</option>
                        <option value="veryActive">Very Active</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Set Goals</Button>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateGoalsModal;
