import React, { useState, useEffect } from 'react';
import DistanceRanChart from './DistanceRanChart';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import LoginRegisterModal from '../../LoginRegister/LoginRegisterModal';
import axios from 'axios';

const backendUrl = "http://localhost:3001/routes";

const RunAnalytics = () => {
    const { token } = useAuth();
    const [modalShow, setModalShow] = useState(false);
    const { state } = useLocation()
    const [previousRuns, setPreviousRuns] = useState([])

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

    function dateLabel(runs) {
        const result = [];
        runs.map((run) => {
            let dateObject = new Date(run.created_at);
            let dateString = dateObject.toDateString() + " " + dateObject.getHours() + ":" + dateObject.getMinutes()
            result.push(dateString)

        })
        return result;

    }

    function distanceEachRun(runs) {
        const result = [];
        runs.map((run) => {
            result.push(run.run_total_distance)
        })
        return result;
    }

    const chartData = {
        labels: dateLabel(previousRuns),
        values: distanceEachRun(previousRuns)
    };

    return (
        <Container>
            <Row className="my-4">
                <Col xs={8}>
                    <Card>
                    <Card.Body>
                    <Card.Title>Distance Ran</Card.Title>
                        <div>
                            <DistanceRanChart data={chartData} />
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                        <Card.Title className='mb-4'>Distance Stats</Card.Title>
                        <div className="stats mt-3 text-center">
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{0}</div>
                                <div className="stat-label">Total Distance</div>
                            </Row>
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{0}</div>
                                <div className="stat-label">Total Distance</div>
                            </Row>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <Card>
                    <Card.Body>
                    <Card.Title>Weight Progression</Card.Title>
                        <div>
                            <DistanceRanChart data={chartData} />
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                        <Card.Title className='mb-4'>Weight Stats</Card.Title>
                        <div className="stats mt-3 text-center">
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{0}</div>
                                <div className="stat-label">Total Distance</div>
                            </Row>
                            <Row className="mb-4">
                                <div className="stat-value font-weight-bold display-4">{0}</div>
                                <div className="stat-label">Total Distance</div>
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