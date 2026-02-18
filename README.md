# Company Review & Rating Platform

A full-stack MERN application for reviewing and rating companies with modern UI design.

## Features

- 🏢 **Company Management**: Add and browse companies with detailed information
- ⭐ **Review System**: Submit reviews with ratings and like functionality
- 🎨 **Modern UI**: Clean interface with gradient designs and Tailwind CSS
- 📸 **Image Upload**: Upload company logos directly
- 🔍 **Advanced Search**: Filter companies by city and sort by name/rating
- 📊 **Rating Analytics**: View average ratings and review counts

## Tech Stack

**Frontend:**
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- RESTful API architecture
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account or local MongoDB

### 1. Backend Setup

```powershell
cd server
copy .env.example .env
# Edit .env and add your MongoDB connection string
npm install
```

**Seed Database with Sample Data:**
```powershell
node seed.js
```
This will create 10 companies with 25+ reviews in your MongoDB Atlas database.

**Start Server:**
```powershell
node server.js
```
Backend runs on: http://localhost:5000

### 2. Frontend Setup

```powershell
cd client
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## Database Seeding

The project includes a seeding script to populate your database with sample data:
- 10 diverse companies across different industries
- 2-3 reviews per company
- Realistic ratings and review content

## API Endpoints

- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company
- `GET /api/companies/:id` - Get company details
- `POST /api/reviews/company/:companyId` - Add review
- `PATCH /api/reviews/:id/like` - Like a review

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # State management
│   │   └── api.js         # API calls
│   └── package.json
│
├── server/                # Express backend
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── seed.js           # Database seeding script
│   └── server.js         # Entry point
│
└── README.md
```

## Environment Variables

Create a `.env` file in the server directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Contributing

Feel free to submit issues and enhancement requests!
