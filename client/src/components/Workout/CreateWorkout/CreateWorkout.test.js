import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateWorkout from "./CreateWorkout";

jest.mock('axios');

jest.mock('../../AuthContext/AuthContext', () => ({
  useAuth: () => ({ token: 'fake-token' })
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

const backendUrl = "http://localhost:3001/";

describe("CreateWorkout Component Tests", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{ WorkOut: 'Push-ups' }, { WorkOut: 'Sit-ups' }]
    });
    mockedNavigate.mockClear();
  });

  test("form is rendered with the correct fields and labels", () => {
    render(
      <AuthProvider>
          <BrowserRouter>
            <CreateWorkout />
          </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText("Workout Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Exercise")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Add Exercise" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Save Workout" })).toBeInTheDocument();
  });

  test("exercises dropdown goes to endpoint to return exercise list", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <CreateWorkout />
        </BrowserRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${backendUrl}exercises`, expect.anything());
      expect(screen.getByPlaceholderText("Select Exercise")).toHaveTextContent("Push-ups");
    });
  });

  test("form validation error messages display with incorrect inputs", async () => {
    render(
      <AuthProvider>
          <BrowserRouter>
            <CreateWorkout />
          </BrowserRouter>
      </AuthProvider>
    );

    const saveButton = screen.getByRole('button', { name: "Save Workout" });
    userEvent.click(saveButton);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Please fill out all fields'));
    alertMock.mockRestore();
  });
});