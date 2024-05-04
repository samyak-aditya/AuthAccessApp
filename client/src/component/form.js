import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const CandidateInterviewForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch existing candidates from backend
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/candidate/all');
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend route using axios.post
      await axios.post('http://localhost:5000/candidate/add', { name, status, feedback, stars });
      console.log('Form data sent successfully');
      // Refresh candidates list after adding a new candidate
      const response = await axios.get('http://localhost:5000/candidate/all');
      setCandidates(response.data.candidates);
      // Clear form fields after submission
      setName('');
      setStatus('Pending');
      setFeedback('');
      setStars(0);
      
      setShowForm(false);
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send request to delete candidate by id
      await axios.delete(`http://localhost:5000/candidate/delete/${id}`);
      console.log('Candidate deleted successfully');
      // Refresh candidates list after deletion
      const response = await axios.get('http://localhost:5000/candidate/all');
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div>
      <h2>Candidate Interview Form</h2>
      <button onClick={() => setShowForm(!showForm)}>Add Candidate</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label>Feedback:</label>
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <div>
              <label>Stars:</label>
              <input type="number" min="0" max="5" value={stars} onChange={(e) => setStars(e.target.value)} />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <h2>Existing Candidates</h2>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}>
            {candidate.name} - {candidate.status}
            <button onClick={() => handleDelete(candidate._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateInterviewForm;
