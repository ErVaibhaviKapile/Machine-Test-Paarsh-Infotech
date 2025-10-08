const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
router.post('/login', async (req,res)=>{
  const { username, password } = req.body;
  try{
    const admin = await Admin.findOne({ username });
    if(!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ admin: admin.id }, process.env.JWT_SECRET, { expiresIn:'8h' });
    res.json({ token });
  }catch(err){
    res.status(500).json({ msg:'Server error' });
  }
});

module.exports = router;
