import React from 'react';
import { Modal } from 'react-bootstrap';
import { formatDuration } from '../WorkoutUtils/WorkoutUtils';

const WorkoutDetailsModal = ({ workout, show, onHide }) => {
    if (!workout) return null;
    let totalWorkoutTimeMinutes = 0;
    const start = new Date(workout.start);
    const end = new Date(workout.end);    
    const workoutDurationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    totalWorkoutTimeMinutes += workoutDurationMinutes;

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
      </Modal>
    );
  };

export default WorkoutDetailsModal;