import logo from './logo.svg';
import './App.css';
import CandidateInterviewForm from './component/form.js';
import SignupForm from './component/signup.js';
import SigninForm from './component/signin.js';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignIn = () => {
    // Implement your sign-in logic here
    // Set authenticated to true if sign-in is successful
    setAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={ <SignupForm /> } />
        <Route path='/signin' element={ <SigninForm /> } />
        <Route path='/candidate' element={ <CandidateInterviewForm /> } />

        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
