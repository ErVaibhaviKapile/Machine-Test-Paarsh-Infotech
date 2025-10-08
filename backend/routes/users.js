const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth');
const User = require('../models/User');

// Get all users
router.get('/', authAdmin, async (req,res)=>{
  const users = await User.find();
  res.json(users);
});

// Update user
router.put('/:id', authAdmin, async (req,res)=>{
  const { name, email, profilePic } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id, { name, email, profilePic }, { new:true });
  res.json(updated);
});

// Delete user
router.delete('/:id', authAdmin, async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg:'User deleted' });
});

module.exports = router;
