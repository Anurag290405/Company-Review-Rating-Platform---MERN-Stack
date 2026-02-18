const Company = require('../models/Company');
const Review = require('../models/Review');

exports.createCompany = async (req, res) => {
  try {
    const c = new Company(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listCompanies = async (req, res) => {
  try {
    const { search, city } = req.query;
    const q = {};
    if (search) q.name = { $regex: search, $options: 'i' };
    if (city) q.city = city;
    const list = await Company.find(q).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompanyDetail = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).lean();
    if (!company) return res.status(404).json({ error: 'Not found' });
    const reviews = await Review.find({ company: company._id }).sort({ createdAt: -1 }).lean();
    const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.rating||0), 0) / reviews.length) : 0;
    res.json({ company, reviews, avgRating: avg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
