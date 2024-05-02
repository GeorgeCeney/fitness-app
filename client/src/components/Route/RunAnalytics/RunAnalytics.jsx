import React, { useState, useEffect } from 'react';
import AnalysisChart from './AnalysisChart';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import LoginRegisterModal from '../../LoginRegister/LoginRegisterModal';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const backendUrl = "http://localhost:3001/routes";

const RunAnalytics = () => {
    const { token } = useAuth();
    const { state } = useLocation()
    const [previousRuns, setPreviousRuns] = useState([])
    const [modalShow, setModalShow] = useState(false);
    
    const [startDate, setStartDate] = useState(new Date(state[0].created_at))
    const [endDate, setEndDate] = useState(new Date((state[state.length-1].created_at)))

    const netWeight = state[0].user_weight - state[state.length-1].user_weight

    useEffect(() => {
        if (token == null) {
          setModalShow(true)
        } else {
            if (state == null) {
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
            } else {
                setPreviousRuns(state)
            } 
        }
    }, [token])
      
    // Preprocess data to ensure there's an entry for each day, filling in missing days with 0 distance
    const distanceData = {};
    const weightData = {};
    // need to add 1 as the graph doesn't process the last date
    let graphEndDate = new Date()
    graphEndDate.setDate(endDate.getDate()+1)

    for (let d = new Date(startDate); d <= graphEndDate; d.setDate(d.getDate() + 1)) {
        distanceData[d.toISOString().split('T')[0]] = 0;
        weightData[d.toISOString().split('T')[0]] = NaN;
    }
    previousRuns.forEach(run => {
        let dateObject = new Date(run.created_at);
        const dateKey = dateObject.toISOString().split('T')[0];
        distanceData[dateKey] += run.run_total_distance;
        weightData[dateKey] = run.user_weight;
    });

    for (const point in distanceData) {
        if (isNaN(distanceData[point])) {
            delete distanceData[point];
        }
    }

    // Extract labels and data for Chart.js
    const labels = Object.keys(distanceData);
    const distances = Object.values(distanceData);
    const weight = Object.values(weightData);

    console.log(weight)

    function sumRunData(runs) {
        let distanceSum = 0;
        let timeSum = 0;
        let caloriesSum = 0;
        runs.map((run) => {
            distanceSum += run.run_total_distance
            timeSum += run.run_time
            caloriesSum += run.estimated_calories_burnt
        })
        let monthTotalDistanceString
        if (distanceSum >= 1000) {
            monthTotalDistanceString = (distanceSum / 1000).toFixed(2) + "km";
        } else {
            monthTotalDistanceString = distanceSum + "m";
        }
        let averageKmPerHour = (distanceSum / 1000) / (timeSum / 60)
        return [monthTotalDistanceString, averageKmPerHour, caloriesSum];
    }

    const [allTimeTotalDistance, allTimeAverageKmPerHour, caloriesSum] = sumRunData(previousRuns)

    const distanceChartData = {
        labels: labels,
        values: distances
    };

    const caloriesChartData = {
        labels: labels,
        values: weight
    };

    return (
        <Container>
            <Card className='my-4'>
            <Card.Body>
                <Card.Title>Time Range</Card.Title>
                <Row className='mt-4'>
                    <Col className='text-center'><DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onSelect={date => setStartDate(date)} className="form-control d-block"/></Col>
                    <Col xs={2}><p className='text-center flex justify-center items-center'>--- to ---</p></Col>
                    <Col className='text-center'><DatePicker dateFormat="dd/MM/yyyy" selected={endDate} onSelect={date => setEndDate(date)} className="form-control d-block"/></Col>
                </Row>
            </Card.Body>
            </Card>
            
            <Row className="my-4">
                <Col xs={8}>
                    <Card style={{height: "100%"}}>
                    <Card.Body>
                    <Card.Title>Daily Running Distance</Card.Title>
                        <div className='mb-4'>
                            <AnalysisChart data={distanceChartData} name="Distance (meters)"/>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{height: "100%"}}>
                        <Card.Body>
                        <Card.Title className='mb-3'>All Time Distance Stats</Card.Title>
                        <div className="stats mt-3 text-center">
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{allTimeTotalDistance}</div>
                                <div className="stat-label">Total Distance Ran</div>
                            </Row>
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{allTimeAverageKmPerHour.toFixed(2)}</div>
                                <div className="stat-label">Average km/h</div>
                            </Row>
                            <Row>
                                <div className="stat-value font-weight-bold display-4">{previousRuns.length}</div>
                                <div className="stat-label">Total Runs</div>
                            </Row>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-4'>
                <Col xs={8}>
                    <Card>
                    <Card.Body>
                    <Card.Title>Calroies Burnt</Card.Title>
                        <div>
                            <AnalysisChart data={caloriesChartData} name="Weight (kg)"/>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{height: "100%"}}>
                        <Card.Body>
                        <Card.Title className='mb-4'>All Time Weight Progress</Card.Title>
                        <div className="stats mt-3 text-center">
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{caloriesSum}</div>
                                <div className="stat-label">Total Estimated Calories Burnt</div>
                            </Row>
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{netWeight}kg</div>
                                <div className="stat-label">Net Weight Difference</div>
                            </Row>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <LoginRegisterModal show={modalShow} handleClose={() => setModalShow(false)} />
        </Container>
        
    );
};

export default RunAnalytics;