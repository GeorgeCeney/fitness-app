import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './pages/Home/Home';
import Calories from './pages/Calories/Calories';
import Workouts from './pages/Workouts/Workouts';
import RoutePlanner from './pages/Routes/RoutePlanner';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import CreateWorkout from './components/Workout/CreateWorkout/CreateWorkout';
import { AuthProvider } from './components/AuthContext/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <Router>
        <NavigationBar />
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/calories" element={<Calories/>}/>
              <Route path="/workouts" element={<Workouts/>}/>
              <Route path="/routes" element={<RoutePlanner />}/>
              <Route path="/workouts/create" element={<CreateWorkout />}/>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
