import { Form, Row, Col } from 'react-bootstrap';

const ExerciseForm = ({ exericseTitle, sets, reps, weight, onSetsChange, onRepsChange, onWeightChange }) => {
  return (
    <>
      <h5>{exericseTitle}</h5>
      <Row>
        <Col md={4}>
          <Form.Group controlId="sets">
            <Form.Label>Sets</Form.Label>
            <Form.Control type="number" placeholder="Number of sets" value={sets} onChange={onSetsChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="reps">
            <Form.Label>Reps</Form.Label>
            <Form.Control type="number" placeholder="Number of reps" value={reps} onChange={onRepsChange} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="weight">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control type="number" placeholder="Weight used" value={weight} onChange={onWeightChange} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default ExerciseForm;
