import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
import { useAuth } from "../../AuthContext/AuthContext";
import './CreateWorkout.css';
import ExerciseForm from '../ExerciseForm/ExerciseForm';

const backendUrl = "http://localhost:3001";

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

const fetchExercises = async () => {
  // Mocked data
  return [
    { value: 'exercise1', label: 'Exercise 1' },
    { value: 'exercise2', label: 'Exercise 2' },
    { value: 'exercise3', label: 'Exercise 3' },
  ];
};

const CreateWorkout = () => {
  const { token } = useAuth();

  const [workoutName, setWorkoutName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchExercises().then(setExercises);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const workoutData = {
      workoutName,
      startTime,
      endTime,
      selectedExercise,
      sets,
      reps,
      weight,
      notes
    };
  
    try {
      await axios.post(`${backendUrl}/workouts/create`, workoutData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Workout Created:', workoutData);
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleExerciseSelect = (option) => {
    setSelectedExercise(option);
  };

  const handleAddNotesClick = () => setShowNotesInput(true);
  const handleCancelNotesClick = () => setShowNotesInput(false);

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
    </Row>
          {!showNotesInput && (
            <Col> 
              <Button variant="secondary" type="button" className="mt-3" onClick={handleAddNotesClick}>
                Add notes
              </Button>
            </Col>
          )}
          {showNotesInput && (
          <Row>
            <Col>
              <Form.Group controlId="workoutNotes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter workout notes here"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button variant="outline-secondary" type="button" className="mt-3" onClick={handleCancelNotesClick}>
                Cancel
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={3}>
              <Form.Group controlId="exercise">
                  <Form.Label>Exercise *</Form.Label>
                    <Select
                      value={selectedExercise}
                      onChange={handleExerciseSelect}
                      options={exercises}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select an exercise type"
                      isClearable={true}
                      isSearchable={true}
                    />
            </Form.Group>
          </Col>
        </Row>
        {selectedExercise && (
          <Row>
            <ExerciseForm
              exericseTitle={selectedExercise.label}
              sets={sets}
              reps={reps}
              weight={weight}
              onSetsChange={(e) => setSets(e.target.value)}
              onRepsChange={(e) => setReps(e.target.value)}
              onWeightChange={(e) => setWeight(e.target.value)}
            />
          </Row>
        )}
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

