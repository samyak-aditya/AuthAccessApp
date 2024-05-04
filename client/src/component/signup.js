import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css'
const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate()
  

  const HandleSignup = async (e) => {

    
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/signup', { username, password });
        console.log('Signup successful:', response.data);
        // Retrieve JWT token from response data
        const token = response.data.token;
        // Store token in localStorage for future use
        localStorage.setItem('token', token);
        // Redirect to /candidate route
        history('/candidate');
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={HandleSignup}>
        <div>
         
          <input placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
