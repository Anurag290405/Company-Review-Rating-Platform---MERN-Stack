import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function ReviewList(){
  const { reviews, likeReview, selectedCompany } = useContext(AppContext);

  if(!reviews || reviews.length === 0) return <div className="text-gray-500">No reviews yet</div>;

  return (
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
                <div className="text-sm text-yellow-400">{Array.from({length:5}).map((_,i)=>(<span key={i}>{i < r.rating ? '★' : '☆'}</span>))}</div>
              </div>
              <div className="mt-2 text-gray-700">{r.text}</div>
            </div>
            <div className="flex items-start">
              <button onClick={()=>likeReview(r._id, selectedCompany._id)} className="text-sm text-gray-600">Like ({r.likes||0})</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
