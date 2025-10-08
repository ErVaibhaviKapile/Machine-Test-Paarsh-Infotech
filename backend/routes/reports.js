const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth');
const Report = require('../models/Report');

// Get all reports
router.get('/', authAdmin, async (req,res)=>{
  const reports = await Report.find().populate('reportedBy reportedUser','name email');
  res.json(reports);
});

// Take action on report
router.put('/:id', authAdmin, async (req,res)=>{
  const { actionTaken } = req.body; // warn/ban/delete
  const updated = await Report.findByIdAndUpdate(req.params.id,{actionTaken},{new:true});
  res.json(updated);
});
