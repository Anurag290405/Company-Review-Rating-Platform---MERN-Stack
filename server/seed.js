const mongoose = require('mongoose');
require('dotenv').config();
const Company = require('./models/Company');
const Review = require('./models/Review');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';

// Sample company data
const companiesData = [
  {
    name: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    foundedOn: '2015-03-15',
    city: 'San Francisco',
    logo: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=TC',
    description: 'Leading provider of cloud-based enterprise solutions and AI-powered analytics.'
  },
  {
    name: 'InnovateTech',
    location: 'New York, NY',
    foundedOn: '2018-07-22',
    city: 'New York',
    logo: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=IT',
    description: 'Innovative software development company specializing in mobile and web applications.'
  },
  {
    name: 'DataDrive Inc',
    location: 'Austin, TX',
    foundedOn: '2012-01-10',
    city: 'Austin',
    logo: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=DD',
    description: 'Data analytics and business intelligence platform for modern enterprises.'
  },
  {
    name: 'GreenEnergy Co',
    location: 'Seattle, WA',
    foundedOn: '2019-05-30',
    city: 'Seattle',
    logo: 'https://via.placeholder.com/150/008000/FFFFFF?text=GE',
    description: 'Sustainable energy solutions and renewable power technology company.'
  },
  {
    name: 'HealthTech Systems',
    location: 'Boston, MA',
    foundedOn: '2016-11-18',
    city: 'Boston',
    logo: 'https://via.placeholder.com/150/800080/FFFFFF?text=HT',
    description: 'Healthcare technology solutions including telemedicine and patient management systems.'
  },
  {
    name: 'FinanceFlow',
    location: 'Chicago, IL',
    foundedOn: '2014-09-05',
    city: 'Chicago',
    logo: 'https://via.placeholder.com/150/FFD700/000000?text=FF',
    description: 'Financial services platform providing digital banking and payment solutions.'
  },
  {
    name: 'EduLearn Platform',
    location: 'Los Angeles, CA',
    foundedOn: '2020-02-14',
    city: 'Los Angeles',
    logo: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=EL',
    description: 'Online education platform with interactive courses and certification programs.'
  },
  {
    name: 'CloudSpace Networks',
    location: 'Denver, CO',
    foundedOn: '2017-06-20',
    city: 'Denver',
    logo: 'https://via.placeholder.com/150/87CEEB/000000?text=CN',
    description: 'Network infrastructure and cloud computing services for businesses worldwide.'
  },
  {
    name: 'FoodDelivery Pro',
    location: 'Miami, FL',
    foundedOn: '2019-08-12',
    city: 'Miami',
    logo: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=FD',
    description: 'Fast and reliable food delivery service with AI-powered route optimization.'
  },
  {
    name: 'RoboTech Industries',
    location: 'San Jose, CA',
    foundedOn: '2013-04-25',
    city: 'San Jose',
    logo: 'https://via.placeholder.com/150/4B0082/FFFFFF?text=RT',
    description: 'Robotics and automation solutions for manufacturing and logistics industries.'
  }
];

// Sample reviews data (templates)
const reviewsTemplate = [
  { fullName: 'John Smith', subject: 'Great workplace culture', text: 'Amazing company with great benefits and work-life balance. Highly recommend!', rating: 5 },
  { fullName: 'Sarah Johnson', subject: 'Good learning opportunities', text: 'Learned a lot here. Management is supportive and encourages professional growth.', rating: 4 },
  { fullName: 'Michael Brown', subject: 'Innovative environment', text: 'Love the innovative culture and cutting-edge technology we work with.', rating: 5 },
  { fullName: 'Emily Davis', subject: 'Decent experience', text: 'Good company overall, but could improve on communication between teams.', rating: 3 },
  { fullName: 'David Wilson', subject: 'Excellent team', text: 'Working with talented people and great managers. Very satisfied with my role.', rating: 5 },
  { fullName: 'Lisa Anderson', subject: 'Fast-paced work', text: 'Very dynamic environment. Can be challenging but rewarding at the same time.', rating: 4 },
  { fullName: 'James Martinez', subject: 'Career growth', text: 'Got promoted twice in two years. Great place for career advancement.', rating: 5 },
  { fullName: 'Jennifer Taylor', subject: 'Good benefits', text: 'Competitive salary and excellent health benefits. Work-life balance could be better.', rating: 4 },
];

async function seedDatabase() {
  try {
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

    // Insert companies
    console.log('Inserting 10 new companies...');
    const companies = await Company.insertMany(companiesData);
    console.log(`✓ Inserted ${companies.length} companies\n`);

    // Insert reviews for each company (2-3 reviews per company)
    console.log('Inserting reviews...');
    let totalReviews = 0;
    
    for (let i = 0; i < companies.length; i++) {
      const company = companies[i];
      const numReviews = Math.floor(Math.random() * 2) + 2; // 2-3 reviews per company
      
      for (let j = 0; j < numReviews; j++) {
        const reviewTemplate = reviewsTemplate[Math.floor(Math.random() * reviewsTemplate.length)];
        await Review.create({
          company: company._id,
          fullName: reviewTemplate.fullName,
          subject: reviewTemplate.subject,
          text: reviewTemplate.text,
          rating: reviewTemplate.rating,
          likes: Math.floor(Math.random() * 20)
        });
        totalReviews++;
      }
    }
    
    console.log(`✓ Inserted ${totalReviews} reviews\n`);

    // Verify the data
    console.log('Verifying data in MongoDB Atlas...');
    const companyCount = await Company.countDocuments();
    const reviewCount = await Review.countDocuments();
    
    console.log('\n========================================');
    console.log('DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    console.log(`Total Companies: ${companyCount}`);
    console.log(`Total Reviews: ${reviewCount}`);
    console.log('\nYou can now check MongoDB Atlas to see the data.');
    console.log('Database name: companyReviewDB');
    console.log('Collections: companies, reviews');
    console.log('========================================\n');

    // Display sample companies
    console.log('Sample Companies Created:');
    companies.slice(0, 3).forEach((company, idx) => {
      console.log(`${idx + 1}. ${company.name} - ${company.location}`);
    });
    console.log(`... and ${companies.length - 3} more companies\n`);

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();
