import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './pages/Home/Home';
import Calories from './pages/Calories/Calories';
import Workouts from './pages/Workouts/Workouts';
import RoutePlanner from './pages/Routes/RoutePlanner';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <NavigationBar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/calories" element={<Calories/>}/>
            <Route path="/workouts" element={<Workouts/>}/>
            <Route path="/routes" element={<RoutePlanner />}/>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
