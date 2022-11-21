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
  const [states, setStates] = useState([{abbreviation:'st', name:'State'}]);
  const [occupations, setOccupations] = useState(['occs']);

  useEffect(() => { //useEffect allows us to set state once call is complete, allowing us to return the filled arrays to the map function
    fetch('https://frontend-take-home.fetchrewards.com/form').then(function(response){ return response.json(); }).then(function(data) {
    console.log(data);
    setStates(data.states);
    setOccupations(data.occupations);
  })}
    , [])
  
  return (
    <div className="App">
      <div className='form-wrapper'>
        <form>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='name'>Name :</label>
            <input type={'text'} id={'name'} />
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='email'>Email :</label>
            <input type={'text'} id={'email'}></input>
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='password'>Password :</label>
            <input type={'text'} id={'password'}></input>
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='occupation'>Occupation :</label>
            <select id='occupation'>
              <option key={'-'} value={'-'}>-</option>
              {occupations.map(occ => {
                return <option key={occ} value={occ}>{occ}</option>
              })}
            </select>
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='states'>State :</label>
            <select id='states'>
              <option key={'-'} value={'-'}>-</option>
              {states.map(state => {
                return <option key={state.abbreviation} value={state.name}>{state.abbreviation}</option>
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}



export default App;
