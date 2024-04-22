import { Row, Col, Container, Form, Button, Card } from "react-bootstrap";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import "./SaveRoute.css"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const backendUrl = "http://localhost:3000/routes";

function SaveRoute() {
    const { state } = useLocation()

    const routeDistance = state.routeDistance

    const { token } = useAuth();
    const navigate = useNavigate();
    const [runName, setRunName] = useState('');
    const [runTime, setRunTime] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [notes, setNotes] = useState('');
    const [estCaloriesBurnt, setEstCaloriesBurnt] = useState('')
    const [numLaps, setNumLaps] = useState(1)

    useEffect(() => {
        // REFERENCE: https://downhilltodowntown.com/how-to-calculate-your-caloric-burn-while-running/
        var MET // Metabolic Equivalent of Task (MET) is a unit used to estimate the energy expenditure of various activities

        let avgKmPerHour = ((routeDistance * numLaps) / 1000) / (runTime / 60)

        const speedRanges = [4.0, 5.7, 8.0, 9.7, 11.3, 12.9, 14.5];
        const mets = [0.5, 2, 4, 6, 8, 10, 11.5, 12.8];
        
        for (let i = 0; i < speedRanges.length; i++) {
            if (avgKmPerHour < speedRanges[i]) {
                MET = mets[i];
                break;
            }
        }
        if (MET === undefined) {
            MET = mets[mets.length - 1];
        }
        
        // Calories Burned = MET x Body Weight (kg) x Duration of Running (hours)
        let estCaloriesBurnt = MET * userWeight * (runTime / 60)
        setEstCaloriesBurnt(estCaloriesBurnt.toFixed(2))

    }, [userWeight, runTime, numLaps])

    function handleTimeChange(e) {
        var minutes = 0
        var seconds = 0

        if (e) {
            minutes = e.$m
            seconds = e.$s
        }

        setRunTime(minutes+(seconds/60))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Format the workout data
        const routeData = {
            runName,
            runTime,
            userWeight,
            estCaloriesBurnt,
            routeDistance,
            numLaps,
            route: state.route,
        };
        console.log(routeData)
      
        try {
          const response = await axios.post(`${backendUrl}/create`, routeData, {
            headers: {
              Authorization: `${token}`,
            },
          });
          console.log('Route saved:', response.data);
          navigate('/routes');    
        } catch (error) {
          console.error('Error saving workout:', error.response.data);
          // Handle error (e.g., showing an error message)
        }
      };

    return (
        <Container className="my-4">
            <Row>
            <Col xs={4}>
            <Card>
                <Card.Body>
                    <Card.Title>Save Run</Card.Title>
                    <Form className="my-3" onSubmit={handleSubmit}>
                    <Row className="my-3">
                        <Form.Group as={Col}>
                            <Form.Label>Run Name</Form.Label>
                            <Form.Control type="text" placeholder="Example: 'Morning Run'" value={runName} onChange={(e) => setRunName(e.target.value)} />
                        </Form.Group>
                       
                    </Row>

                    <Row className="my-3">
                        <Form.Group as={Col}>
                            <Form.Label>Run Time</Form.Label><br/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker views={['minutes', 'seconds']} format="mm:ss" onChange={(e) => handleTimeChange(e)}/>
                            </LocalizationProvider>
                        </Form.Group>
                    </Row>

                    <Row className="my-3">
                    <Form.Group as={Col}>
                            <Form.Label>Laps</Form.Label>
                            <Form.Control type="number" value={numLaps} min={1} onChange={(e) => setNumLaps(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="my-3"> 
                        <Form.Group as={Col}>
                            <Form.Label>Current Weight (kg)</Form.Label><br/>
                            <Form.Control type="number" placeholder="Example: 68" min={1} value={userWeight} onChange={(e) => setUserWeight(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Row className="my-3"> 
                        <Form.Group as={Col}>
                            <Form.Label>Estimated Calories Burnt</Form.Label><br/>
                            <Form.Control id="estCaloriesBurnt" type="number" placeholder="0.00" value={estCaloriesBurnt} disabled/>
                        </Form.Group>
                    </Row>
                    
                    <Row className="my-3">
                        <Col>
                        <Button id="saveRunButton" variant="primary" type="submit">Save Run</Button>
                        </Col>
                        <Col>
                        <Button id="cancelSaveRunButton" variant="primary" onClick={() => navigate("/routes")}>Cancel</Button>
                        </Col> 
                    </Row>
                </Form>

                </Card.Body>
            </Card>
                
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Created Route</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Exact Distance Ran: {state.routeDistance * numLaps}m</Card.Subtitle>
                        <img src={state.routeImage} alt="RouteImage"/>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default SaveRoute; 