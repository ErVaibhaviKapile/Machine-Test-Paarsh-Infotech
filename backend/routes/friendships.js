const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth');
const FriendRequest = require('../models/FriendRequest');

// Get all friend requests
router.get('/requests', authAdmin, async (req,res)=>{
  const requests = await FriendRequest.find().populate('from to','name email');
  res.json(requests);
});

// Update request (accept/reject)
router.put('/requests/:id', authAdmin, async (req,res)=>{
  const { status } = req.body; // accepted/rejected
  const updated = await FriendRequest.findByIdAndUpdate(req.params.id,{status},{new:true});
  res.json(updated);
});
