import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import AddReviewModal from './AddReviewModal.jsx';
import ReviewList from './ReviewList.jsx';

export default function CompanyDetail(){
  const { selectedCompany, avgRating } = useContext(AppContext);
  const [showAddReview, setShowAddReview] = useState(false);

  if(!selectedCompany) return null;

  return (
    <div>
      <h3>{selectedCompany.name}</h3>
      <div style={{ fontSize: 14 }}>{selectedCompany.city} — {selectedCompany.location}</div>
      <div style={{ marginTop: 8 }}>
        <strong>Average Rating: </strong>{avgRating.toFixed(1)}
      </div>
      <div style={{ marginTop: 12 }}>{selectedCompany.description}</div>
      <hr />
      <h4>Reviews</h4>
      <button 
        onClick={() => setShowAddReview(true)}
        className="mb-4 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-500"
      >
        + Add Review
      </button>
      <ReviewList />
      {showAddReview && <AddReviewModal companyId={selectedCompany._id} onClose={() => setShowAddReview(false)} />}
    </div>
  );
}
