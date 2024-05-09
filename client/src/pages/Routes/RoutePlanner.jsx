import Map from "../../components/Map/Map";
import { Button, Card, Col, Container, Row, Alert } from "react-bootstrap";
import './RoutePlanner.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import LoginRegisterModal from "../../components/LoginRegister/LoginRegisterModal";
import axios from "axios";

const backendUrl = "http://localhost:3001/routes";

const RoutePlanner = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  const [previousRuns, setPreviousRuns] = useState([])

  useEffect(() => {
    if (token == null) {
      setModalShow(true)
    } else {
        const fetchRunData = async () => {
            const response = await axios.get(`${backendUrl}/previous-routes`, {
                headers: {
                  Authorization: `${token}`,
                },
            });
            console.log('Previous Routes:', response.data.results);
            return response.data.results
        }
        fetchRunData().then(setPreviousRuns);
    }
  }, [token])

  const handleViewRunAnalytics = () => {
    navigate('/routes/run-analytics', { state: previousRuns })
  }

  // Function to calculate sum of distance ran in the current month
  function calculateDistanceInCurrentMonth(runs) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    let monthDistance = 0;
    let numRuns = 0;

    runs.forEach(run => {
        const entryDate = new Date(run.created_at);
        if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
          monthDistance += run.run_total_distance;
          numRuns += 1;
        }
    });

    return [numRuns, monthDistance];
  }

  const [monthRunsNum, monthTotalDistance] = calculateDistanceInCurrentMonth(previousRuns)

  let monthTotalDistanceString
  if (monthTotalDistance >= 1000) {
    monthTotalDistanceString = (monthTotalDistance / 1000).toFixed(2) + "km";
  } else {
    monthTotalDistanceString = monthTotalDistance + "m";
  }

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
                    <div className="stat-value font-weight-bold display-4">{monthRunsNum}</div>
                    <div className="stat-label">Runs</div>
                  </Col>
                  <Col xs={6} className="mb-4">
                    <div className="stat-value font-weight-bold display-4">{monthTotalDistanceString}</div>
                    <div className="stat-label">Total Distance</div>
                  </Col>
                </Row>
                <Button id="ViewRunAnalytics" onClick={handleViewRunAnalytics}>View Analytics</Button>
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
      <LoginRegisterModal show={modalShow} handleClose={() => setModalShow(false)} />
    </Container>
  );
};

export default RoutePlanner;