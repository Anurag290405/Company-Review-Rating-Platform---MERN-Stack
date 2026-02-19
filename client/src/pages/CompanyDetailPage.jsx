import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import Header from '../components/Header.jsx';
import ReviewList from '../components/ReviewList.jsx';
import AddReviewModal from '../components/AddReviewModal.jsx';

export default function CompanyDetailPage(){
  const { id } = useParams();
  const { selectedCompany, selectCompany, avgRating, reviews } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

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

            <div className="mt-6">
              <ReviewList />
            </div>
          </div>
        </div>

        {showModal && <AddReviewModal companyId={selectedCompany._id} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
