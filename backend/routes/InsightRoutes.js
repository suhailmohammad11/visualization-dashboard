const express = require("express");
const router = express.Router();
const {
  getInsights,
  getDistinctField
} = require("../controllers/InsightController");

router.get("/insights", getInsights);

router.get("/meta/:field", getDistinctField);

module.exports = router;
