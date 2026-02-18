import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function AddReviewModal({ companyId, onClose }){
  const { addReview } = useContext(AppContext);
  const [form, setForm] = useState({ fullName: '', subject: '', text: '', rating: 4 });

  const submit = async (e)=>{
    e.preventDefault();
    await addReview(companyId, { ...form, rating: Number(form.rating) });
    setForm({ fullName: '', subject: '', text: '', rating: 4 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white relative shadow-lg w-[530px] h-[731px] rounded-[25px] overflow-hidden">
          {/* decorative gradient blobs (top-left) */}
          <div className="absolute -top-1 -left-[34px] w-[116px] h-[116px] rounded-full bg-gradient-to-br from-[#D100F3] to-[#002BC5] z-0" />
          <div className="absolute -top-[55px] left-7 w-[116px] h-[116px] rounded-full bg-gradient-to-br from-[#D100F3] to-[#002BC5] opacity-25 z-0" />        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 z-50"
        >
          ✕
        </button>
        
        {/* Content */}
        <div className="relative z-10 pt-20 px-12 pb-6 h-full flex flex-col overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">Add Review</h3>
          
          {/* Form */}
          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Full Name Input */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
              <input 
                placeholder="Enter" 
                value={form.fullName} 
                onChange={e=>setForm({...form, fullName:e.target.value})} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Subject</label>
              <input 
                placeholder="Enter" 
                value={form.subject} 
                onChange={e=>setForm({...form, subject:e.target.value})} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Review Textarea */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Enter your Review</label>
              <textarea 
                placeholder="Description" 
                value={form.text} 
                onChange={e=>setForm({...form, text:e.target.value})} 
                required 
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Rating Section */}
            <div>
              <label className="text-base font-semibold mb-3 block">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({...form, rating: star})}
                    className="text-3xl focus:outline-none text-yellow-500"
                  >
                    {star <= form.rating ? '★' : '☆'}
                  </button>
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {form.rating === 5 ? 'Satisfied' : form.rating === 4 ? 'Good' : form.rating === 3 ? 'Average' : form.rating === 2 ? 'Poor' : 'Bad'}
                </span>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 pb-2">
              <button 
                type="submit" 
                className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-br from-[#D100F3] to-[#002BC5]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
