import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ExerciseForm = ({ exerciseTitle, sets, reps, weight, onSetsChange, onRepsChange, onWeightChange, onRemove }) => {
  return (
    <>
      <h4>{exerciseTitle}</h4>
      <Row className='mb-3'>
          <Form.Group as={Col}>
            <Form.Label>Sets</Form.Label>
            <Form.Control type="number" placeholder="Sets" value={sets} onChange={onSetsChange} />
          </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col}>
          <Form.Label>Reps</Form.Label>
          <Form.Control type="number" placeholder="Reps" value={reps} onChange={onRepsChange} />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
       <Form.Group as={Col}>
          <Form.Label>Weight</Form.Label>
          <Form.Control type="number" placeholder="Weight (kg)" value={weight} onChange={onWeightChange} />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Button variant="danger" onClick={onRemove}>Remove</Button>
        </Col>
      </Row>
    </>
  );
};

export default ExerciseForm;
