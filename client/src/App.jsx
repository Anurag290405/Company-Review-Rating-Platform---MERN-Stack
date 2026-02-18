import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext.jsx';
import Homepage from './pages/Homepage.jsx';
import CompanyDetailPage from './pages/CompanyDetailPage.jsx';

export default function App(){
  const { loadCompanies } = useContext(AppContext);
  useEffect(()=>{ loadCompanies(); }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/company/:id" element={<CompanyDetailPage />} />
      </Routes>
    </Router>
  );
}
