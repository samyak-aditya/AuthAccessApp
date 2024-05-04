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


