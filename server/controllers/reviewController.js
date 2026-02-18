const Review = require('../models/Review');
const Company = require('../models/Company');

exports.createReview = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    const payload = Object.assign({}, req.body, { company: company._id });
    const r = new Review(payload);
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const r = await Review.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Not found' });
    r.likes = (r.likes || 0) + 1;
    await r.save();
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
