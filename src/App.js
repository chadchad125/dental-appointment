import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddModal from './components/AddModal'
import AvailabilityTable from './components/AvailablityTable';

function App() {
  const [availability, setAvailability] = useState([]);
  const headers = ["Doctor", "Assistant", "Hygenist"]
  const hours = [9,10,11,12,13,14,15]

  const updateData = (data) =>{
    let holding = [...availability, data]
    setAvailability(holding)
  } 
  
  return (
    <div className="App">
      <br/>
      <AddModal titles={headers} hours={hours} availability={availability} updateData={updateData}/>
      <br/><br/>
      <AvailabilityTable headers={headers} hours={hours} availability={availability}/>
    </div>
  );
}

export default App;
