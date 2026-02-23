import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import Header from '../components/Header.jsx';
import AddReviewModal from '../components/AddReviewModal.jsx';
import EditReviewModal from '../components/EditReviewModal.jsx';

export default function CompanyDetailPage(){
  const { id } = useParams();
  const { selectedCompany, selectCompany, avgRating, reviews, likeReview } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(()=>{
    if(id) selectCompany(id);
  }, [id]);

  if(!selectedCompany) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="relative w-[1440px] mx-auto" style={{ minHeight: 1200 }}>
        <div className="absolute top-[100px] left-[188px] w-[1064px]">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-6">
              <img
                src={selectedCompany.logo || 'https://via.placeholder.com/120'}
                alt="logo"
                className="w-28 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedCompany.name}</h2>
                    <div className="text-sm text-gray-500">{selectedCompany.location}{selectedCompany.city ? `, ${selectedCompany.city}` : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Founded on</div>
                    <div className="text-sm">{selectedCompany.foundedOn || '01-01-2016'}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">{(avgRating || 0).toFixed(1)}</div>
                    <div className="text-yellow-400">{Array.from({ length: 5 }).map((_, i) => (<span key={i}>{i < Math.round(avgRating || 0) ? '★' : '☆'}</span>))}</div>
                    <div className="text-sm text-gray-600">{selectedCompany.reviewCount ?? reviews.length} Reviews</div>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white px-6 py-2 rounded-lg bg-gradient-to-br from-[#D100F3] to-[#002BC5] hover:opacity-90"
                  >
                    + Add Review
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal line */}
            <div className="mt-6 mb-6">
              <hr className="border-t border-gray-300" />
            </div>

            {/* Reviews List */}
            <div className="mt-6">
              {!reviews || reviews.length === 0 ? (
                <div className="text-gray-500">No reviews yet</div>
              ) : (
                <ul className="space-y-4">
                  {reviews.map(r=> (
                    <li key={r._id} className="bg-white p-4 rounded shadow-sm">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">{r.fullName ? r.fullName.split(' ').map(n=>n[0]).slice(0,2).join('') : 'U'}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold">{r.fullName}</div>
                              <div className="text-sm text-gray-500">{r.subject}</div>
                            </div>
                            <div className="text-lg text-yellow-400">{Array.from({length:5}).map((_,i)=>(<span key={i}>{i < r.rating ? '★' : '☆'}</span>))}</div>
                          </div>
                          <div className="mt-2 text-gray-700">{r.text}</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <button onClick={()=>likeReview(r._id, selectedCompany._id)} className="text-sm text-gray-600 hover:text-gray-800">Like ({r.likes||0})</button>
                          <button onClick={()=>setEditingReview(r)} aria-label={`Edit review by ${r.fullName}`} className="text-sm text-blue-600 hover:text-blue-800">Edit Review</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {showModal && <AddReviewModal companyId={selectedCompany._id} onClose={() => setShowModal(false)} />}
        {editingReview && <EditReviewModal review={editingReview} companyId={selectedCompany._id} onClose={() => setEditingReview(null)} />}
      </div>
    </div>
  );
}
