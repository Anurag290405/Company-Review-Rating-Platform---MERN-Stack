import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { AppContext } from '../context/AppContext.jsx';
import AddCompanyModal from '../components/AddCompanyModal.jsx';
import locationIcon from '../assests/akar-icons_location.png';

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

export default function Homepage(){
  const { companies, loadCompanies } = useContext(AppContext);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedSort, setSelectedSort] = useState('name');

  useEffect(() => {
    loadCompanies();
  }, []);

  const cityOptions = useMemo(() => {
    const uniqueByCity = new Map();

    companies.forEach((company) => {
        const city = (company.city || '').trim();
        const location = (company.location || '').trim();
        if (!city && !location) return;

        const optionValue = city || location;
        const optionLabel = city && location ? `${location}, ${city}` : optionValue;

        if (!uniqueByCity.has(optionValue)) {
          uniqueByCity.set(optionValue, { value: optionValue, label: optionLabel });
        }
      });

    return Array.from(uniqueByCity.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [companies]);

  const onFindCompany = async () => {
    await loadCompanies(selectedCity ? { city: selectedCity } : {});
    setHasSearched(true);
  };

  const sortOptions = useMemo(() => (
    [
      { value: 'name', label: 'Sort: Name' },
      { value: 'rating', label: 'Sort: Rating' },
      { value: 'avg', label: 'Sort: Avg' },
      { value: 'location', label: 'Sort: Location' }
    ]
  ), []);

  const visibleCompanies = useMemo(() => {
    const list = [...companies];

    switch (selectedSort) {
      case 'rating':
      case 'avg':
        return list.sort((a, b) => {
          const aRating = Number.isFinite(a.avgRating) ? a.avgRating : 0;
          const bRating = Number.isFinite(b.avgRating) ? b.avgRating : 0;
          return bRating - aRating;
        });
      case 'location':
        return list.sort((a, b) => {
          const aLoc = `${a.location || ''} ${a.city || ''}`.trim();
          const bLoc = `${b.location || ''} ${b.city || ''}`.trim();
          return aLoc.localeCompare(bLoc);
        });
      case 'name':
      default:
        return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
  }, [companies, selectedSort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative w-[1440px] mx-auto min-h-[calc(100vh-75px)]">
        {/* Controls Section */}
        <div className="h-[100px] px-[188px] pt-[20px] flex items-center gap-3">
          {/* Select City Box */}
          <div className="flex-1 max-w-[413px] min-w-[260px] h-[37px] border border-gray-300 rounded-[5px] px-3 flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-full bg-transparent appearance-none outline-none"
            >
              <option value="">Select City</option>
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <img
              src={locationIcon}
              alt="Location"
              className="w-5 h-5 shrink-0"
            />
          </div>

          {/* Find Company Button */}
          <button
            onClick={onFindCompany}
            className="text-white text-sm font-semibold h-[37px] min-w-[130px] px-4 rounded-[5px] bg-gradient-to-br from-[#D100F3] to-[#002BC5] shrink-0 flex items-center justify-center whitespace-nowrap"
          >
            Find Company
          </button>

          {/* Add Company Button */}
          <button 
            onClick={()=>setShowAdd(true)} 
            className="text-white text-sm font-semibold h-[37px] min-w-[150px] px-4 rounded-[5px] bg-gradient-to-br from-[#D100F3] to-[#002BC5] shrink-0 flex items-center justify-center whitespace-nowrap"
          >
            + Add Company
          </button>

          {/* Sort Box */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="border border-gray-300 px-2 w-[154px] h-[37px] rounded-[5px] shrink-0 ml-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Companies List */}
        <div className="space-y-4 px-[188px]">
          {hasSearched && companies.length === 0 && <div className="text-gray-500">Result Found: 0</div>}
          {hasSearched && visibleCompanies.map((company) => {
            const avg = Number.isFinite(company.avgRating) ? company.avgRating : 0;
            const reviewCount = Number.isFinite(company.reviewCount) ? company.reviewCount : 0;
            return (
              <div key={company._id} className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6 hover:shadow-xl transition">
                <img src={company.logo || 'https://via.placeholder.com/96'} alt="logo" className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{company.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <img
                          src={locationIcon}
                          alt="Location"
                          className="w-4 h-4 shrink-0 grayscale opacity-70"
                        />
                        <span>{company.location || ''} {company.city ? `, ${company.city}` : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="text-lg font-bold">{avg.toFixed(1)}</div>
                    <Stars value={avg} />
                    <div className="text-sm text-gray-600">{reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right text-sm text-gray-400">Founded on {company.foundedOn || '01-01-2016'}</div>
                  <Link to={`/company/${company._id}`} className="bg-gray-800 text-white px-4 py-2 rounded inline-block">Detail Review</Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {showAdd && <AddCompanyModal onClose={()=>setShowAdd(false)} />}
    </div>
  );
}
