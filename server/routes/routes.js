import express from 'express';
import { addCandidate,allCandidate } from '../controller/candidate.js';


const router = express.Router();

// GET route
router.get('/candidate/all', allCandidate)


// POST route
router.post('/candidate/add', addCandidate);
router.post('/signup', (req, res) => {
  const { body } = req;
  res.json({ message: 'POST request received', data: body });
});




export default router;
