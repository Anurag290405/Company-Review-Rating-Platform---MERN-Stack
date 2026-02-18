// Use Render backend URL in production, local API in development
const API = import.meta.env.PROD 
  ? 'https://company-review-rating-platform-mern-stack.onrender.com/api'
  : '/api';

export async function fetchCompanies(q){
  const params = new URLSearchParams(q||{}).toString();
  const res = await fetch(`${API}/companies${params?('?'+params):''}`);
  return res.ok ? res.json() : [];
}

export async function createCompany(payload){
  const res = await fetch(`${API}/companies`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  return res.json();
}

export async function getCompany(id){
  const res = await fetch(`${API}/companies/${id}`);
  return res.json();
}

export async function createReview(companyId, payload){
  const res = await fetch(`${API}/reviews/company/${companyId}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  return res.json();
}

export async function likeReview(id){
  const res = await fetch(`${API}/reviews/${id}/like`, { method: 'PATCH' });
  return res.json();
}
