const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const campaignRoutes = require("./campaignRoutes");

router.use("/auth", authRoutes);
router.use("/campaigns", campaignRoutes);

module.exports = router;
