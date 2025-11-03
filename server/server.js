const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Set mongoose strictQuery to avoid deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware (should be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});