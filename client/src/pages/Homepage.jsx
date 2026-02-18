import React, { useContext, useState } from 'react';
import Header from '../components/Header.jsx';
import CompanyCard from '../components/CompanyCard.jsx';
import { AppContext } from '../context/AppContext.jsx';
import AddCompanyModal from '../components/AddCompanyModal.jsx';

export default function Homepage(){
  const { companies } = useContext(AppContext);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative w-[1440px] mx-auto min-h-[calc(100vh-75px)]">
        {/* Controls Section */}
        <div className="relative h-[100px]">
          {/* Select City Box */}
          <select className="border border-gray-300 px-3 absolute w-[413px] h-[37px] rounded-[5px] top-[20px] left-[188px]">
            <option>Select City</option>
            <option>Indore, Madhya Pradesh, India</option>
          </select>

          {/* Find Company Button */}
          <button className="text-white absolute w-[120px] h-[37px] rounded-[5px] top-[20px] left-[636px] bg-gradient-to-br from-[#D100F3] to-[#002BC5]">
            Find Company
          </button>

          {/* Add Company Button */}
          <button 
            onClick={()=>setShowAdd(true)} 
            className="text-white absolute w-[146px] h-[37px] rounded-[5px] top-[20px] left-[868px] bg-gradient-to-br from-[#D100F3] to-[#002BC5]"
          >
            + Add Company
          </button>

          {/* Sort Box */}
          <select className="border border-gray-300 px-2 absolute w-[154px] h-[37px] rounded-[5px] top-[20px] left-[1098px]">
            <option>Sort: Name</option>
            <option>Sort: Rating</option>
          </select>
        </div>

        {/* Companies List */}
        <div className="space-y-4 px-[188px]">
          {companies.length === 0 && <div className="text-gray-500">Result Found: 0</div>}
          {companies.map(c => (
            <CompanyCard key={c._id} company={c} />
          ))}
        </div>
      </main>

      {showAdd && <AddCompanyModal onClose={()=>setShowAdd(false)} />}
    </div>
  );
}
