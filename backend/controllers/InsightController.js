const Insight = require("../models/Insights");

const clean = (arr) =>
  arr
    .filter(v => v !== null && v !== undefined && v !== "")
    .map(v => String(v).trim());

exports.getInsights = async (req, res) => {
  try {
    const filters = {};

    if (req.query.end_year) filters.end_year = req.query.end_year;
    if (req.query.start_year) filters.start_year = req.query.start_year;
    if (req.query.topic) filters.topic = req.query.topic;
    if (req.query.sector) filters.sector = req.query.sector;
    if (req.query.region) filters.region = req.query.region;
    if (req.query.pestle) filters.pestle = req.query.pestle;
    if (req.query.source) filters.source = req.query.source;
    if (req.query.swot) filters.swot = req.query.swot;
    if (req.query.country) filters.country = req.query.country;

    const data = await Insight.find(filters);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDistinctField = async (req, res) => {
  try {
    const field = req.params.field;
    const data = await Insight.distinct(field);
    res.status(200).json(clean(data));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
