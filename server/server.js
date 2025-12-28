require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const alumniRoutes = require('./routes/alumniRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.DATABASE || 'mongodb://localhost:27017/alumni';
connectDB(mongoUri);


app.use('/api/users', userRoutes);
app.use('/api/alumni', alumniRoutes);


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
