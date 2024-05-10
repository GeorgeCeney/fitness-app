import React from "react";
import { render, screen } from "@testing-library/react";
import WorkoutDetailsModal from "./WorkoutDetailsModal";
import { formatDuration } from "../WorkoutUtils/WorkoutUtils";

jest.mock('../WorkoutUtils/WorkoutUtils', () => ({
  formatDuration: jest.fn()
}));

describe("WorkoutDetailsModal Component Tests", () => {
  const mockWorkout = {
    title: "Bicep Workout",
    start: "2021-04-12T06:00:00Z",
    end: "2021-04-12T07:00:00Z",
    exercises: [
      { exercise_name: "Barbell Curls", sets: 1, reps: 1, weight: 5 }
    ]
  };

  beforeEach(() => {
    formatDuration.mockReturnValue("1 hour");
  });

  test("correct data is displayed given provided exercise events", () => {
    render(
      <WorkoutDetailsModal workout={mockWorkout} show={true} onHide={() => {}} />
    );

    expect(screen.getByText("Bicep Workout")).toBeInTheDocument();
    expect(screen.getByText("1:00")).toBeInTheDocument();
    expect(screen.getByText("Barbell Curls - 1 sets, 1 reps, 5 kg")).toBeInTheDocument();
  });

  test("correct buttons are rendered", () => {
    render(
      <WorkoutDetailsModal workout={mockWorkout} show={true} onHide={() => {}} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
