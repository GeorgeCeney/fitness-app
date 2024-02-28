import React, { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import './WorkoutCalendar.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../AuthContext/AuthContext";
import { formatDuration } from "../WorkoutUtils/WorkoutUtils";
import WorkoutDetailsModal from "../WorkoutDetailsModal/WorkoutDetailsModal";

const backendUrl = "http://localhost:3001/workouts";

const localizer = momentLocalizer(moment);

const WorkoutCalendar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [eventsData, setEventsData] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const fetchWorkouts = useCallback(async (start, end) => {
    let totalWorkoutTimeMinutes = 0;
    const endpoint = `${backendUrl}/?start=${start}&end=${end}`;
    
    if (token) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `${token}`
          }
        });
        if (response.ok) {
          const workouts = await response.json();
          const formattedEvents = workouts.map(workout => {
            const start = new Date(workout.start_time);
            const end = new Date(workout.end_time);
        
            const workoutDurationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
            totalWorkoutTimeMinutes += workoutDurationMinutes;
        
            return {
              title: workout.workout_name,
              start: start,
              end: end,
              exercises: workout.exercises,
            };
          });

          setEventsData(formattedEvents);
          setTotalWorkouts(workouts.length);
          const formattedTotalWorkoutTime = formatDuration(totalWorkoutTimeMinutes);
          setTotalWorkoutTime(formattedTotalWorkoutTime);
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const startDate = moment(currentDate).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(currentDate).endOf('month').format('YYYY-MM-DD');
    fetchWorkouts(startDate, endDate);
  }, [currentDate, fetchWorkouts]);

  const handleNavigate = date => {
    setCurrentDate(date);
  };

  const handleSelectEvent = useCallback((event) => {
    setSelectedWorkout(event);
  }, []);

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
                <div className="stats mt-3">
                  <Row className="text-center">
                    <Col xs={6} className="mb-4">
                      <div className="stat-value font-weight-bold display-4">{totalWorkoutTime}</div>
                      <div className="stat-label">Duration</div>
                    </Col>
                    <Col xs={6} className="mb-4">
                      <div className="stat-value font-weight-bold display-4">{totalWorkouts}</div>
                      <div className="stat-label">Workouts</div>
                    </Col>
                  </Row>
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
                  onNavigate={handleNavigate}
                  selectable
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  style={{ height: 500 }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <WorkoutDetailsModal
          workout={selectedWorkout}
          show={selectedWorkout != null}
          onHide={() => setSelectedWorkout(null)}
        />
      </Container>
    );
};

export default WorkoutCalendar;
