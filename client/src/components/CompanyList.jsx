import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';

export default function CompanyList(){
  const { companies, loadCompanies, selectCompany } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const onSearch = ()=> loadCompanies({ search });

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <input placeholder="Search by name" value={search} onChange={e=>setSearch(e.target.value)} />
        <button onClick={onSearch}>Search</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {companies.map(c=> (
          <li key={c._id} style={{ padding: 8, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={()=>selectCompany(c._id)}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <img src={c.logo||'https://via.placeholder.com/48'} alt="logo" style={{ width:48, height:48, objectFit:'cover' }} />
              <div>
                <strong>{c.name}</strong>
                <div style={{ fontSize: 12 }}>{c.city} — {c.location}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
