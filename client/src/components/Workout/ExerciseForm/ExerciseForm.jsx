import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ExerciseForm = ({ exerciseTitle, sets, reps, weight, onSetsChange, onRepsChange, onWeightChange, onRemove }) => {
  return (
    <>
      <h4>{exerciseTitle}</h4> {/* Display the exercise title */}
      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Sets</Form.Label>
            <Form.Control type="number" placeholder="Sets" value={sets} onChange={onSetsChange} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Reps</Form.Label>
            <Form.Control type="number" placeholder="Reps" value={reps} onChange={onRepsChange} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" placeholder="Weight (kg)" value={weight} onChange={onWeightChange} />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="danger" onClick={onRemove}>Remove</Button>
        </Col>
      </Row>
    </>
  );
};

export default ExerciseForm;
