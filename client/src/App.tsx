import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Calories from './pages/Calories/Calories';
import Workouts from './pages/Workouts/Workouts';
import RoutePlanner from './pages/Routes/RoutePlanner';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/calories" element={<Calories/>}/>
            <Route path="/workouts" element={<Workouts/>}/>
            <Route path="/routes" element={<RoutePlanner />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
