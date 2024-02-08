import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Calories from './components/Calories/Calories';
import Workouts from './components/Workouts/Workouts';
import RoutePlanner from './components/RoutePlanner/RoutePlanner';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path="/home" element={<Home />}/>
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
