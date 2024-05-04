import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './form.css'

const CandidateInterviewForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCandidate, setEditCandidate] = useState(null);

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

  const handleEdit = (candidate) => {
    setEditCandidate(candidate);
    setName(candidate.name);
    setStatus(candidate.status);
    setFeedback(candidate.feedback);
    setStars(candidate.stars);
    setShowForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send edited form data to backend route using axios.put
      await axios.put(`http://localhost:5000/candidate/edit/${editCandidate._id}`, { name, status, feedback, stars });
      console.log('Form data edited successfully');
      // Refresh candidates list after editing
      const response = await axios.get('http://localhost:5000/candidate/all');
      setCandidates(response.data.candidates);
      // Clear form fields after submission
      setName('');
      setStatus('Pending');
      setFeedback('');
      setStars(0);
      setEditCandidate(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error editing form data:', error);
    }
  };

  // Function to generate stars based on the stars value
  const renderStars = (stars) => {
    const starComponents = [];
    for (let i = 1; i <= 5; i++) { // Loop from 1 to 5 (total number of stars)
      if (i <= stars) {
        starComponents.push(<span key={i} style={{ color: 'gold' }}>&#9733;</span>); // Filled star
      } else {
        starComponents.push(<span key={i} style={{ color: 'gray' }}>&#9733;</span>); // Empty star
      }
    }
    return starComponents;
  };

  return (
    <div className='candidate-form'>
      <h1>Candidate Interview Form</h1>
      <button style={{ width: '100%' }} onClick={() => setShowForm(!showForm)}>Add Candidate</button>
      {showForm && (
        <div className="add-candidate-form">
          <h1>{editCandidate ? 'Edit Candidate' : 'Add Candidate'}</h1>
          <form onSubmit={editCandidate ? handleEditSubmit : handleSubmit}>
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
            <button type="submit" style={{ width: '100%' }}>{editCandidate ? 'Save Changes' : 'Submit'}</button>
          </form>
        </div>
      )}

      <h1>Existing Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Stars</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.status}</td>
              <td>{candidate.feedback}</td>
              <td>{renderStars(candidate.stars)}</td>
              <td className='actions'>
                <button style={{ width: "50%" }} onClick={() => handleDelete(candidate._id)}>Delete</button>
                <button style={{ width: "50%", marginLeft: "5px" }} onClick={() => handleEdit(candidate)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateInterviewForm;
