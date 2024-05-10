import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import WorkoutCalendar from "./WorkoutCalendar";
import { AuthContext, AuthProvider } from "../../AuthContext/AuthContext";

jest.mock('../../AuthContext/AuthContext', () => ({
  useAuth: () => ({ token: 'fake-token' })
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { workout_name: "Barbell Curls", start_time: new Date('2024-05-01T09:00:00Z'), end_time: new Date('2024-05-01T10:00:00Z'), exercises: [] }
    ])
  })
);

describe("WorkoutCalendar Component Tests", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    fetch.mockClear();
  });

  test("statistics panel and calendar view are displayed", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <WorkoutCalendar />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByTestId('workout-calendar-component')).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Workout" })).toBeInTheDocument();
  });

  test("correct statistics are displayed", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <WorkoutCalendar />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(await screen.findByTestId('duration-value')).toHaveTextContent('1:00');
    expect(await screen.findByTestId('workouts-value')).toHaveTextContent('1');
  });

  test("correct workouts are displayed in calendar view", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <WorkoutCalendar />
        </BrowserRouter>
      </AuthProvider>
    );

    const calendarEvent = await screen.findByText('Run');
    expect(calendarEvent).toBeInTheDocument();
  });

  test("‘Add Workout’ button navigates to correct page", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <WorkoutCalendar />
        </BrowserRouter>
      </AuthProvider>
    );

    userEvent.click(screen.getByRole('button', { name: "Add Workout" }));
    expect(mockedNavigate).toHaveBeenCalledWith('/workouts/create');
  });
});