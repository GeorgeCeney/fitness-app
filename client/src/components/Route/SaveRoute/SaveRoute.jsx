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

    console.log(state)

    const { token } = useAuth();
    const navigate = useNavigate();
    const [runName, setRunName] = useState('');
    const [runTime, setRunTime] = useState();
    const [userWeight, setUserWeight] = useState("");
    const [notes, setNotes] = useState('');
    const [estCaloriesBurnt, setEstCaloriesBurnt] = useState("")

    useEffect((routeDistance) => {
        // REFERENCE: https://downhilltodowntown.com/how-to-calculate-your-caloric-burn-while-running/
        var MET = 0 // Metabolic Equivalent of Task (MET) is a unit used to estimate the energy expenditure of various activities

        let avgKmPerHour = (routeDistance / 1000) / (runTime / 60)

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

        // If avgKmPerHour is greater than or equal to the last speed range
        // var estCaloriesBurntDiv = document.getElementById("estCalories")
        
        // Calories Burned = MET x Body Weight (kg) x Duration of Running (hours)
        let estCaloriesBurnt = MET * userWeight * (runTime / 60)
        // estCaloriesBurntDiv.innerHTML = routeDistance > 0 ? estCaloriesBurnt : 0
        setEstCaloriesBurnt(estCaloriesBurnt)
    })

    function handleTimeChange(e) {
        const minutes = e.$m
        const seconds = e.$s

        setRunTime(minutes+(seconds/60))
    }


    const handleSubmit = async (event) => {

        event.preventDefault();
        // Format the workout data
        const routeData = {
            runName,
            runTime
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
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Run Name</Form.Label>
                    <Form.Control type="text" placeholder="Example: 'Morning Run'" value={runName} onChange={(e) => setRunName(e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3"> 
                <Form.Group as={Col}>
                    <Form.Label>Run Time</Form.Label><br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker views={['minutes', 'seconds']} format="mm:ss" onChange={(e) => handleTimeChange(e)}/>
                    </LocalizationProvider>
                </Form.Group>
            </Row>

            <Row className="mb-3"> 
                <Form.Group as={Col}>
                    <Form.Label>Current Weight (kg)</Form.Label><br/>
                    <Form.Control type="number" placeholder="Example: 68" value={userWeight} onChange={(e) => setUserWeight(e.target.value)} />
                </Form.Group>
            </Row>

            <Row className="mb-3"> 
                <Form.Group as={Col}>
                    <Form.Label>Estimated Calories Burnt</Form.Label><br/>
                    <Form.Control id="estCaloriesBurnt" type="number" placeholder="0" value={estCaloriesBurnt} disabled/>
                </Form.Group>
            </Row>

            <Col>
                {/* <Button onClick={handleAddExercise} disabled={!selectedExercise}>Add Exercise</Button> */}
            </Col>
            
            <Row>
            <Col>
                <Button variant="primary" type="submit">Save Run</Button>
            </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default SaveRoute; 