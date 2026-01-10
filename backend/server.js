const mongoose = require('mongoose');
const app = require('./app');

const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/aroundb' } = process.env;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
