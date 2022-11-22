import { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import PopUp from './PopUp';
import { useMemo } from 'react';

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
  const [submitted, setSubmitted] = useState(false);
  const toggleView = (value) => {
    setSubmitted(value);
  }
  const displaySuccess = useMemo(() => submitSuccess(submitted), [submitted]);
  return (
    <div className="App">
      { !displaySuccess && <SignUp toggleView={toggleView}></SignUp>}
      { displaySuccess && <PopUp toggleView={toggleView}></PopUp>}
    </div>
  );
}

function submitSuccess (value) {
  return value
}

export default App;
