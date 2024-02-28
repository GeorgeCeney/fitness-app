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


const backendUrl = "http://localhost:3001/workouts";

const CreateWorkout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]); // Options for the select dropdown
  const [notes, setNotes] = useState('');

  useEffect(() => {

    // const fetchExercises = async () => {
    //   try {
    //     const response = await axios.get(`${backendUrl}/exercises`);
    //     return response.data.map((exercise: any) => ({
    //       label: exercise.WorkOut
    //     }));
    //   } catch (error) {
    //     console.error('Error fetching exercises:', error);
    //     return [];
    //   }
    // };

    // Mocking the fetchExercises call
    const fetchExercises = async () => {
      return [
        { value: 'exercise1', label: 'Exercise 1' },
        { value: 'exercise2', label: 'Exercise 2' },
        { value: 'exercise3', label: 'Exercise 3' },
      ];
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Format the workout data
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
      const response = await axios.post(`${backendUrl}/create`, workoutData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Workout saved:', response.data);
      navigate('/workouts');    
    } catch (error) {
      console.error('Error saving workout:', error.response.data);
      // Handle error (e.g., showing an error message)
    }
  };

  return (
    <Container className="create-workout-container my-4">
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col>
            <Form.Group controlId="workoutName">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control type="text" placeholder="Enter workout name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <DatePicker selected={startTime} onChange={date => setStartTime(date)} showTimeSelect dateFormat="Pp" className="form-control" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <DatePicker selected={endTime} onChange={date => setEndTime(date)} showTimeSelect dateFormat="Pp" className="form-control" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Label>Exercise</Form.Label>
            <Select
              options={exerciseOptions}
              value={selectedExercise}
              onChange={setSelectedExercise}
              placeholder="Select Exercise"
              isClearable
            />
          </Col>
          <Col md={2}>
            <Button onClick={handleAddExercise} disabled={!selectedExercise}>Add Exercise</Button>
          </Col>
        </Row>
        <Row>
        {exercises.map((exercise, index) => (
            <ExerciseForm
              key={index}
              exerciseTitle={exercise.label} // Assuming exercise object has a label property for the title
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
            <Button variant="primary" type="submit">Save Workout</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateWorkout;
