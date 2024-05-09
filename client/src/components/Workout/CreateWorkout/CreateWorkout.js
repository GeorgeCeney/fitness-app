import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const [workoutName, setWorkoutName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {

    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${backendUrl}exercises`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        
        return response.data.map((exercise: any) => ({
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
        exerciseId: ex.value,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
      })),
    };
  
    try {
      const response = await axios.post(`${backendUrl}workouts/create`, workoutData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Workout saved successfully");
      navigate('/workouts');    
    } catch (error) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    }
  };

  return (
    <Container className="create-workout-container my-4">
      <h1>Create Workout</h1>
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
          <Col>
            <Button id='save-workout-button' variant="primary" type="submit">Save Workout</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateWorkout;
