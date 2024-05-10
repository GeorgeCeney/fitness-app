import React from 'react';
import { render } from '@testing-library/react';
import Workouts from './Workouts';
import { AuthProvider } from '../../components/AuthContext/AuthContext';

describe('Workouts page', () => {
  test('renders WorkoutCalendar component', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <Router>
          <Workouts />
        </Router>
      </AuthProvider>
  );
    const workoutCalendar = getByTestId('workout-calendar-component');
    expect(workoutCalendar).toBeInTheDocument();
  });
});
