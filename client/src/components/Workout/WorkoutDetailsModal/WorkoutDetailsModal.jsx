import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { formatDuration } from '../WorkoutUtils/WorkoutUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const backendUrl = 'http://localhost:3001/workouts';


const WorkoutDetailsModal = ({ workout, show, onHide, onDelete }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!workout) return null;
    let totalWorkoutTimeMinutes = 0;
    const start = new Date(workout.start);
    const end = new Date(workout.end);    
    const workoutDurationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    totalWorkoutTimeMinutes += workoutDurationMinutes;

    const handleEdit = () => {
      console.log('workout:', workout);
      navigate('/workouts/create', { state: { workout } });
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await axios.delete(`${backendUrl}/${workout.id}`, {
                    headers: { 
                      Authorization: `${token}` 
                    }
                });
                alert("Workout deleted successfully");
                onDelete();
                onHide();
            } catch (error) {
                console.error('Error deleting workout:', error);
            }
        }
    };

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{workout.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Duration: </strong>{formatDuration(totalWorkoutTimeMinutes)}</p>
          <p><strong>Exercises: </strong></p>
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.exercise_name} - {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} kg
              </li>
            ))}
          </ul>
          <p><strong>Notes: </strong>{workout.notes}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>Close</Button>
          <Button variant='primary' onClick={handleEdit}>Edit</Button>
          <Button variant='danger' onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default WorkoutDetailsModal;