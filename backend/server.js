require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/friendships', require('./routes/friendships'));
app.use('/api/reports', require('./routes/reports'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
