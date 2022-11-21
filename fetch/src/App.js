import './App.css';
import fetch from 'node-fetch';
import { useEffect, useState } from 'react';


/*FORM REQs 
FIELDS : 
NAME
EMAIL
PASSWORD
OCCUPATION
STATE

Minimum Req : 
Display the form
Allow Submit
ONLY submit when all forms filled
Make a pop up saying form submitted
*/ 
function App() {
  const [states, setStates] = useState(['-']);
  const [occupations, setOccupations] = useState(['-']);

  useEffect(() => { //useEffect allows us to set state once call is complete, allowing us to return the filled arrays to the map function
    fetch('https://frontend-take-home.fetchrewards.com/form').then(function(response){ return response.json(); }).then(function(data) {
    console.log(data);
    setStates(data.states);
    setOccupations(data.occupations);
  })}
    , [])
  
  return (
    <div className="App">
      <form>
        <label htmlFor="name">Name :</label>
        <input type={"text"} id={"name"}></input>
        <label htmlFor="email">Email :</label>
        <input type={"text"} id={"email"}></input>
        <label htmlFor="password">Password :</label>
        <input type={"text"} id={"password"}></input>
        <label htmlFor="occupation">Occupation :</label>
        <select id='occupation'>
            {occupations.map(occ => {
              return <option key={occ} value={occ}>{occ}</option>
            })}
        </select>
        <label htmlFor="states">Occupation :</label>
        <select id='states'>
            {states.map(state => {
              return <option key={state.abbreviation} value={state.name}>{state.abbreviation}</option>
            })}
        </select>
      </form>
    </div>
  );
}



export default App;
