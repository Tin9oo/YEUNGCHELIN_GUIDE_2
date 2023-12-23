import { useEffect, useState } from 'react';
import './App.css';
import Comp_multiple_values from './components/Comp_multiple_values';
import Comp_filtered_item from './components/Comp_filtered_item';
import Comp_addRestaurant from './components/Comp_addRestaurant';

function App() {
  const [refresh, setRefresh] = useState(false); // 0과 1을 번갈아가며 사용
  const [selRest, setSelRest] = useState({
    name: [],
    category1: [],
    category2: [],
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
      <Comp_multiple_values onValueChange={handleSelRest} refresh={refresh} setRefresh={setRefresh}/>
      <Comp_addRestaurant refresh={refresh} setRefresh={setRefresh}/>
      <Comp_filtered_item selRest={selRest} refresh={refresh} setRefresh={setRefresh}/>
    </div>
  );
}

export default App;
