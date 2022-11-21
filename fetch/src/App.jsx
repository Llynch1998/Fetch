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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('-');
  const [occupation, setOccupation] = useState('-');
  const [disable, setDisable] = useState(true);

  function checkSubmit() {
    //window.alert(name)
    if (name !== '' && email !== '' && password !== '' && state !== '-' && occupation !== '-'){
      //window.alert('success');
      const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': name, 'email': email, 'password': password, 'occupation': occupation, 'state': state })
      };
      fetch('https://frontend-take-home.fetchrewards.com/form', request).then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }

      this.setState({ postId: data.id })
      })
    }
  }

  useEffect(() => { //useEffect allows us to set state once call is complete, allowing us to return the filled arrays to the map function
    fetch('https://frontend-take-home.fetchrewards.com/form').then(function(response){ return response.json(); }).then(function(data) {
    //console.log(data);
    setStates(data.states);
    setOccupations(data.occupations);
  })}
    , [])

    useEffect(() => {
      if (name !== '' && email !== '' && password !== '' && state !== '-' && occupation !== '-'){
        setDisable(false);
      }
      else{
        setDisable(true);
      }
    }, [name, email, password, state, occupation])
  
  return (
    <div className="App">
      <div className='form-wrapper'>
        <form id='signup-form'>
          <div className='form-header'> <h3 className='header-text'>Fetch Front End Assessment</h3></div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='name'>Name :</label>
            <input type={'text'} id={'name'} className='input-style' onChange={ e => setName(e.target.value)} />
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='email'>Email :</label>
            <input type={'text'} id={'email'} className='input-style' onChange={ e => setEmail(e.target.value)} />
          </div>
          <div className='input-wrapper'>
            <label className='input-label'  htmlFor='password'>Password :</label>
            <input type={'password'}  id={'password'} className='input-style' onChange={ e => setPassword(e.target.value)} />
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='occupation'>Occupation :</label>
            <select id='occupation' className='input-style' onChange={ e => setOccupation(e.target.value)}>
              <option key={'-'} value={'-'}>-</option>
              {occupations.map(occ => {
                return <option key={occ} value={occ}>{occ}</option>
              })}
            </select>
          </div>
          <div className='input-wrapper'>
            <label className='input-label' htmlFor='states'>State :</label>
            <select id='states' className='input-style'onChange={ e => setState(e.target.value)} >
              <option key={'-'} value={'-'}>-</option>
              {states.map(state => {
                return <option key={state.abbreviation} value={state.name}>{state.abbreviation}</option>
              })}
            </select>
          </div>
          <button className='submit' onClick={() => checkSubmit()} disabled={disable}>Submit</button>
        </form>
      </div>
    </div>
  );
}



export default App;
