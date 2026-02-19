import React, { createContext, useState } from 'react';
import * as api from '../API/api.js';

export const AppContext = createContext();

export function AppProvider({ children }){
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  async function loadCompanies(q){
    const list = await api.fetchCompanies(q);
    setCompanies(list || []);
  }

  async function addCompany(payload){
    const c = await api.createCompany(payload);
    await loadCompanies();
    return c;
  }

  async function selectCompany(id){
    const res = await api.getCompany(id);
    setSelectedCompany(res.company);
    setReviews(res.reviews || []);
    setAvgRating(res.avgRating || 0);
  }

  async function addReview(companyId, payload){
    const r = await api.createReview(companyId, payload);
    await selectCompany(companyId);
    await loadCompanies();
    return r;
  }

  async function likeReview(id, companyId){
    await api.likeReview(id);
    await selectCompany(companyId);
    await loadCompanies();
  }

  return (
    <AppContext.Provider value={{
      companies, loadCompanies, addCompany,
      selectedCompany, selectCompany, reviews, addReview, likeReview, avgRating
    }}>{children}</AppContext.Provider>
  );
}
