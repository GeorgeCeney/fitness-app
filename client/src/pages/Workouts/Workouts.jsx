import React, { useState } from 'react';
import WorkoutCalendar from "../../components/Workout/Calendar/WorkoutCalendar";
import { Tab, Tabs } from 'react-bootstrap';

const Workouts = () => {
  const [key, setKey] = useState('dashboard');

  return (
    <>
      <Tabs
        id="workouts-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k ?? 'dashboard')}
        variant="pills"
        className='mb-3'
      >
        <Tab eventKey="dashboard" title="Dashboard">
          <WorkoutCalendar />
        </Tab>
        <Tab eventKey="stats" title="Stats">
        </Tab>
      </Tabs>
    </>
  );
}

export default Workouts;
