const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const companiesRouter = require('./routes/companies');
const reviewsRouter = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Configure Mongoose and connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';
require('dotenv').config();
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => {
    console.log('Mongo connected');

    // register routes after DB connected
    app.use('/api/companies', companiesRouter);
    app.use('/api/reviews', reviewsRouter);
    app.get('/', (req, res) => res.send({ ok: true }));

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message || err);
    process.exit(1);
  });
