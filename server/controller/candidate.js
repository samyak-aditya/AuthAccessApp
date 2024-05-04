import express from 'express';
import Candidate from '../models/schema.js';


export const addCandidate = async (req, res) => {
  try {
   
    const { name, status, feedback, stars } = req.body;
    console.log(name, status, feedback, stars);
   
    const candidate = new Candidate({
      name,
      status,
      feedback,
      stars,
    });

    
    await candidate.save();
    console.log(`candidate added`)
    res.status(201).json({ message: 'Candidate added successfully', candidate });
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const allCandidate = async (req, res) => {
    try {
      
      const candidates = await Candidate.find();
      res.status(200).json({ candidates });
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const deleteCandidate= async (req, res) => {
    try {
      const { id } = req.params;
      // Find the candidate by ID and delete it
      await Candidate.findByIdAndDelete(id);
      res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  // Assuming you have already set up your Express.js server and connected it to MongoDB

// Define the route to handle PUT requests to edit a candidate
export const editCandidate= async (req, res) => {
    const candidateId = req.params.id;
    const { name, status, feedback, stars } = req.body;
  
    try {
      // Update the candidate information in the database
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        candidateId,
        { name, status, feedback, stars },
        { new: true } // Return the updated document
      );
  
      if (!updatedCandidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      res.status(200).json({ message: 'Candidate updated successfully', candidate: updatedCandidate });
    } catch (error) {
      console.error('Error updating candidate:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  