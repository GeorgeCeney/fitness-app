import React, { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import './WorkoutCalendar.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../AuthContext/AuthContext";

const backendUrl = "http://localhost:3001/workouts";

const localizer = momentLocalizer(moment);

const WorkoutCalendar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState([]);

  const fetchWorkouts = useCallback(async () => {
    const endpoint = `${backendUrl}/`;
    if (token) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const workouts = await response.json();
          const formattedEvents = workouts.map(workout => ({
            title: workout.workout_name,
            start: new Date(workout.start_time),
            end: new Date(workout.end_time),
          }));
          setEventsData(formattedEvents);
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleSelectSlot = useCallback(slotInfo => {
    const { start, end } = slotInfo;
    navigate('/workouts/create', { state: { start, end } });
  }, [navigate]);

  const handleAddWorkout = () => {
    navigate('/workouts/create');
  };

  return (
      <Container>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Dashboard</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Monthly View
                </Card.Subtitle>
                <div className="stats">
                  <div>0 Distance (km)</div>
                  <div>0 Duration (s)</div>
                  <div>0 Calories (kcal)</div>
                  <div>0 Workouts</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Button variant="primary" className="float-right" onClick={handleAddWorkout}>
                  Add Workout
                </Button>
              </Card.Header>
              <Card.Body>
                <Calendar
                  localizer={localizer}
                  events={eventsData}
                  views={["month"]}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSelectSlot}
                  style={{ height: 500 }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default WorkoutCalendar;
