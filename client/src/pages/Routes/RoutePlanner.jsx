import Map from "../../components/Map/Map";
import { useState } from "react";


const RoutePlanner = () => {
  const [startingPoint, setStartingPoint] = useState('');

  const handleInputChange = (event) => {
    setStartingPoint(event.target.value);
  };


  return (
    <div>
      <input type="text" value={startingPoint} onChange={handleInputChange} />
      <input id="TESTER" type="button" />
      <Map startingPoint={startingPoint} setStartingPoint={setStartingPoint} />
    </div>
  );
};

export default RoutePlanner;