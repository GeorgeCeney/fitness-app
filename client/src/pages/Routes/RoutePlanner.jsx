import Map from "../../components/Map/Map";
import { Button, Card, Col, Container, Row, Alert } from "react-bootstrap";
import './RoutePlanner.css';

const RoutePlanner = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Monthly View</Card.Subtitle>
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
                <Button id="ViewPreviousRunsButton">View Previous Runs</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="my-4">
        
        <Col xs={8}>
          <Map/>
        </Col>
        
        <Col>
          <Row>
            <Card>
              <Card.Body>
                <Card.Title>Current Run</Card.Title>
                <div className="stats mt-3">
                  <Row className="text-center mb-2">
                    <div id= "RouteDistanceDiv" className="stat-value font-weight-bold display-4">0m</div>
                    <div className="stat-label">Route Distance</div>
                    {/* <Col xs={6} className="mb-4">
                      <div id="estCaloriesBurntDiv" className="stat-value font-weight-bold display-4">{0}</div>
                      <div className="stat-label">Estimated Calories Burnt</div>
                    </Col> */}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Row>

          <Row className="my-3">
            <Col>
              <Button id="UndoRouteButton">Undo</Button>
            </Col>
            <Col>
              <Button id="ClearRouteButton">Clear</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button id="SaveRun" className="mb-3">Save Current Run</Button>
              <Alert className="mb-3" variant="warning" id="SaveRouteWarning">Please enter a route.</Alert>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  );
};

export default RoutePlanner;