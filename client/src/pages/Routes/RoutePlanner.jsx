import Map from "../../components/Map/Map";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";


const RoutePlanner = () => {
  // const [startingPoint, setStartingPoint] = useState('');
  const [weight, setWeight] = useState(0)
  const [time, setTime] = useState(0)

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Monthly View
              </Card.Subtitle>
              <div className="stats mt-3">
                <Row className="text-center">
                  <Col xs={6} className="mb-4">
                    <div className="stat-value font-weight-bold display-4">{0}</div>
                    <div className="stat-label">Runs</div>
                  </Col>
                  <Col xs={6} className="mb-4">
                    <div className="stat-value font-weight-bold display-4">{0}km</div>
                    <div className="stat-label">Total Distance</div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Map/>
        </Col>
        <Col>
          <Row>
            <div id="panel"></div>
          </Row>
          <Row>
            {/* <input type="text" value={startingPoint} onChange={(e) => setStartingPoint(e.target.value)} /> */}
            <Col>
              <Button id="UndoRouteButton">Undo</Button>
            </Col>
            <Col>
              <Button id="ClearRouteButton">Clear</Button>
            </Col>
            
            <p>Set Weight</p>
            <input id="weightInput" type="number" value={weight} onChange={(e) => setWeight(e.target.value)}/>

            <p>Set Time</p>
            <input id="timeInput" type="number" value={time} onChange={(e) => setTime(e.target.value)}/>

            <button id="SaveRun">Save Run</button>
          </Row>
        </Col>
      </Row>
      <Row>
      <Card>
        <Card.Body>
          <Card.Title>Current Run</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Stats</Card.Subtitle>
          <div className="stats mt-3">
            <Row className="text-center">
              <Col xs={6} className="mb-4">
                <div id= "RouteDistanceDiv" className="stat-value font-weight-bold display-4">0m</div>
                <div className="stat-label">Route Distance</div>
              </Col>
              <Col xs={6} className="mb-4">
                <div id="estCaloriesBurntDiv" className="stat-value font-weight-bold display-4">{0}</div>
                <div className="stat-label">Estimated Calories Burnt</div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      </Row>
    </Container>

  );
};

export default RoutePlanner;