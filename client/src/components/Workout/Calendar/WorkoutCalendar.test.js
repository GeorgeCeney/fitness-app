import { render, screen } from '@testing-library/react';
import WorkoutCalendar from './WorkoutCalendar';
import { AuthProvider } from '../../AuthContext/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders workout calendar with correct default statistics', () => {
  render(
    <AuthProvider>
        <Router>
            <WorkoutCalendar />
        </Router>
    </AuthProvider>
  );
  
  // Assert that the calendar component is rendered
  const calendarElement = screen.getByTestId("workout-calendar-component");
  expect(calendarElement).toBeInTheDocument();

  const totalWorkoutsElement = screen.getByTestId("workouts-value");
  const totalDurationElement = screen.getByTestId("duration-value");

  expect(totalWorkoutsElement).toHaveTextContent("0");
  expect(totalDurationElement).toHaveTextContent("0");
});




