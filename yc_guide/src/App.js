import { useEffect, useState } from 'react';
import './App.css';
import Comp_multiple_values from './components/Comp_multiple_values';
import Comp_filtered_item from './components/Comp_filtered_item';
import RestaurantDetailPopup from './components/Restaurant_detail';

function App() {
  const [selRest, setSelRest] = useState({
    name: [],
    category1: [],
    coarse_location: []
  });

  useEffect(() => {
    console.log(selRest);
  }, [selRest]);

  const handleSelRest = (selType, values) => {
    setSelRest(prevSelRest => ({
      ...prevSelRest,
      [selType]: values
    }));
    console.log(`[${selType}]: ${values}`);
  };

  return (
    <div className="App">
      <Comp_multiple_values onValueChange={handleSelRest}/>
      <RestaurantDetailPopup props={1}/>
      <Comp_filtered_item selRest={selRest}/>
    </div>
  );
}

export default App;
