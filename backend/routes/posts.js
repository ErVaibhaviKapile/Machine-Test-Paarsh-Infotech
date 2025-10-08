const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth');
const Post = require('../models/Post');

// Get all posts
router.get('/', authAdmin, async (req,res)=>{
  const posts = await Post.find().populate('user','name email');
  res.json(posts);
});

// Delete post
router.delete('/:id', authAdmin, async (req,res)=>{
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg:'Post deleted' });
});
