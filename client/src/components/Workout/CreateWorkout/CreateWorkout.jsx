import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateWorkout.css';
import Select from 'react-select';
import axios from 'axios';
import ExerciseForm from '../ExerciseForm/ExerciseForm';
import { useAuth } from "../../AuthContext/AuthContext";


const backendUrl = "http://localhost:3001/";

const CreateWorkout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const editingWorkout = location.state?.workout;

  const [workoutName, setWorkoutName] = useState(editingWorkout ? editingWorkout.title : '');
  const [startTime, setStartTime] = useState(editingWorkout ? new Date(editingWorkout.start) : new Date());
  const [endTime, setEndTime] = useState(editingWorkout ? new Date(editingWorkout.end) : new Date());
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState(editingWorkout ? editingWorkout.exercises.map(ex => ({
    label: ex.exercise_name,
    value: ex.exercise_id,
    sets: ex.sets,
    reps: ex.reps,
    weight: ex.weight
  })) : []);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [notes, setNotes] = useState(editingWorkout ? editingWorkout.notes : '');

  useEffect(() => {

    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${backendUrl}exercises`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        
        return response.data.map((exercise) => ({
          label: exercise.WorkOut
        }));
      } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
      }
    };

    fetchExercises().then(setExerciseOptions);
  }, []);

  const handleAddExercise = () => {
    if (selectedExercise) {
      setExercises([...exercises, { ...selectedExercise, sets: '', reps: '', weight: '' }]);
      setSelectedExercise(null);
    }
  };

  const handleRemoveExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleExerciseDetailChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const isFormFilled = () => {
    return (
      workoutName !== '' &&
      startTime !== '' &&
      endTime !== '' &&
      exercises.length > 0 &&
      exercises.every(exercise => exercise.sets !== '' && exercise.reps !== '' && exercise.weight !== '')
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isFormFilled()) {
      alert('Please fill out all fields');
      return;
    }

    const workoutData = {
      workoutName,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      notes,
      exercises: exercises.map(ex => ({
        exerciseId: ex.label,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
      })),
    };
  
    try {
        if(editingWorkout) {
          await axios.put(`${backendUrl}workouts/${editingWorkout.id}`, workoutData, {
            headers: {
              Authorization: `${token}`,
            },
          });
            alert("Workout updated successfully");
        } else {
          await axios.post(`${backendUrl}workouts/create`, workoutData, {
            headers: {
              Authorization: `${token}`,
            },
          });
          alert("Workout saved successfully");
      
        };
      navigate('/workouts');    
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  return (
    <Container className="create-workout-container my-4">
      <h1>{editingWorkout ? 'Update Workout' : 'Create Workout'}</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="workoutName" as={Col}>
            <Form.Label>Workout Name</Form.Label>
            <Form.Control type="text" placeholder="Enter workout name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="startTime" as={Col}>
            <Form.Label>Start Time</Form.Label>
            <DatePicker
              id='start-time-picker'
              selected={startTime}
              onChange={date => setStartTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="form-control d-block"
              wrapperClassName="d-block w-100"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="endTime" as={Col}>
            <Form.Label>End Time</Form.Label>
            <DatePicker
              id='end-time-picker'
              selected={endTime}
              onChange={date => setEndTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="form-control d-block"
              wrapperClassName="d-block w-100"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Exercise</Form.Label>
            <Select
              options={exerciseOptions}
              value={selectedExercise}
              onChange={setSelectedExercise}
              placeholder="Select Exercise"
              isClearable
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button id='add-exercise-button' onClick={handleAddExercise} disabled={!selectedExercise}>Add Exercise</Button>
          </Col>
        </Row>
        <Row>
        {exercises.map((exercise, index) => (
            <ExerciseForm
              key={index}
              exerciseTitle={exercise.label}
              sets={exercise.sets}
              reps={exercise.reps}
              weight={exercise.weight}
              onSetsChange={(e) => handleExerciseDetailChange(index, 'sets', e.target.value)}
              onRepsChange={(e) => handleExerciseDetailChange(index, 'reps', e.target.value)}
              onWeightChange={(e) => handleExerciseDetailChange(index, 'weight', e.target.value)}
              onRemove={() => handleRemoveExercise(index)}
            />
        ))}
        </Row>
        <Row>
          <Form.Group controlId="notes" as={Col}>
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button id='save-workout-button' variant="primary" type="submit">{editingWorkout ? 'Update Workout' : 'Save Workout'}</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateWorkout;
