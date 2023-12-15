import { useState } from 'react';
import './App.css';
import Comp_multiple_values from './components/Comp_multiple_values';
import Comp_filtered_item from './components/Comp_filtered_item';
import RestaurantDetailPopup from './components/Restaurant_detail';

function App() {
  const [selRest, setSelRest] = useState([]);

  return (
    <div className="App">
      <Comp_multiple_values onValueChange={setSelRest}/>
      <Comp_filtered_item selRest={selRest}/>
      <RestaurantDetailPopup/>
    </div>
  );
}

export default App;
