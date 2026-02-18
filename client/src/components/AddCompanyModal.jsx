import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function AddCompanyModal({ onClose }){
  const { addCompany } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', location: '', foundedOn: '', logo: '', description: '' });
  const [logoPreview, setLogoPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setForm({...form, logo: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await addCompany(form);
      setForm({ name: '', location: '', foundedOn: '', logo: '', description: '' });
      setLogoPreview('');
      onClose();
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative">
        <div className="bg-white p-6 relative overflow-hidden shadow-lg w-[414px] h-[494px] rounded-[25px]">
          {/* decorative gradient blobs (top-left) */}
          <div className="absolute -top-1 -left-[34px] w-[116px] h-[116px] rounded-full bg-gradient-to-br from-[#D100F3] to-[#002BC5] z-0" />
          <div className="absolute -top-[55px] left-7 w-[116px] h-[116px] rounded-full bg-gradient-to-br from-[#D100F3] to-[#002BC5] opacity-25 z-0" />

          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 shadow z-50">×</button>

          <div className="text-center mt-8 mb-6 relative z-10">
            <h3 className="text-lg font-semibold">Add Company</h3>
          </div>

          <div className="relative z-10 overflow-y-auto max-h-[350px]">
            <form onSubmit={submit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Company name</label>
                <input 
                  required 
                  value={form.name} 
                  onChange={e=>setForm({...form, name:e.target.value})}
                  className="w-full mt-0 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white" 
                  placeholder="Enter..." 
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Location</label>
                <input 
                  value={form.location} 
                  onChange={e=>setForm({...form, location:e.target.value})}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300" 
                  placeholder="Enter location" 
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Founded on</label>
                <input 
                  type="date" 
                  value={form.foundedOn} 
                  onChange={e=>setForm({...form, foundedOn:e.target.value})}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300" 
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Company Logo</label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Choose File
                  </button>
                  {logoPreview && (
                    <img src={logoPreview} alt="Logo preview" className="w-12 h-12 object-cover rounded border" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea 
                  value={form.description} 
                  onChange={e=>setForm({...form, description:e.target.value})}
                  className="w-full mt-0 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300" 
                  placeholder="Enter description"
                  rows="3"
                />
              </div>

              <div className="text-center pt-2">
                <button type="submit" className="px-8 py-2 rounded-full text-white shadow bg-gradient-to-br from-[#D100F3] to-[#002BC5]">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
