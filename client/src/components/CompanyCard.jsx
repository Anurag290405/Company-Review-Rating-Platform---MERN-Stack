import React from 'react';
import { Link } from 'react-router-dom';

function Stars({ value }){
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {Array.from({length:full}).map((_,i)=>(<span key={i}>★</span>))}
      {half && <span>☆</span>}
    </div>
  );
}

export default function CompanyCard({ company }){
  const avg = company.avgRating || 4.5;
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6 hover:shadow-xl transition">
      <img src={company.logo || 'https://via.placeholder.com/96'} alt="logo" className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{company.name}</h3>
            <div className="text-sm text-gray-500">{company.location || ''} {company.city?`, ${company.city}`:''}</div>
          </div>
          <div className="text-right text-sm text-gray-400">Founded on {company.foundedOn || '01-01-2016'}</div>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="text-lg font-bold">{avg.toFixed(1)}</div>
          <Stars value={avg} />
          <div className="text-sm text-gray-600">41 Reviews</div>
        </div>
      </div>
      <div>
        <Link to={`/company/${company._id}`} className="bg-gray-800 text-white px-4 py-2 rounded inline-block">Detail Review</Link>
      </div>
    </div>
  );
}
