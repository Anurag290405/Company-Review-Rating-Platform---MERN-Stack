const mongoose = require('mongoose');
require('dotenv').config();
const Company = require('./models/Company');
const Review = require('./models/Review');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';



async function seedDatabase() {
  
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB Atlas\n');

    // Delete all existing data
    console.log('Deleting existing data...');
    const deletedReviews = await Review.deleteMany({});
    const deletedCompanies = await Company.deleteMany({});
    console.log(`✓ Deleted ${deletedReviews.deletedCount} reviews`);
    console.log(`✓ Deleted ${deletedCompanies.deletedCount} companies\n`);

  }


seedDatabase();
