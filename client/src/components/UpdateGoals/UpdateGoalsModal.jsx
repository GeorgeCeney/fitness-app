import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateGoalsModal = ({ show, handleClose }) => {
    const [goalsData, setGoalsData] = useState({ startingWeight: '', currentWeight: '', goalWeight: '', weeklyGoal: '', activityLevel: '' });
    const startingWeightRef = useRef(null);
    const currentWeightRef = useRef(null);
    const weeklyGoalRef = useRef(null);
    const goalWeightRef = useRef(null);
    const activityLevelRef = useRef(null);

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

    const handleSubmit = () => {
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
        // SEND API Request to parse through DATA
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Starting Weight</Form.Label>
                    <Form.Control ref={startingWeightRef} onChange={handleChange} type="number" />
                    <Form.Label>Current Weight</Form.Label>
                    <Form.Control ref={currentWeightRef} onChange={handleChange} type="number" />
                    <Form.Label>Goal Weight</Form.Label>
                    <Form.Control id="goalWeight" type="number" ref={goalWeightRef} onChange={handleChange} />
                    <Form.Label>Weekly Goal</Form.Label>
                    <Form.Select onChange={handleChange} ref={weeklyGoalRef}>
                        <option value="">Set Weekly Goal</option>
                        <option value="lose1">Lose 1 Kg/Week</option>
                        <option value="lose05">Lose 0.5 Kg/Week</option>
                        <option value="maintain">Maintain Weight</option>
                        <option value="gain025">Gain 0.25 Kg/Week</option>
                        <option value="gain05">Gain 0.5 Kg/Week</option>
                    </Form.Select>
                    <Form.Label>Activity Level</Form.Label>
                    <Form.Select onChange={handleChange} ref={activityLevelRef}>
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
