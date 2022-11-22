import './PopUp.css';
import './App.css';

function PopUp({ toggleView }){

    return( 
        <div className='modal'>
            <div className='modal-header'><h3 className='header-text'>Success!</h3></div>
                <p>Thank you for completing the form!</p>
            <button className='submit' onClick={() => toggleView(false)}>Return to Form</button>
        </div>)
}

export default PopUp;