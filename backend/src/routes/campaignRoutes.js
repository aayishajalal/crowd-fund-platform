const express = require('express');
const { createCampaign, getAllCampaigns, getCampaignById, donateToCampaign } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createCampaign);
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/:id/donate', protect, donateToCampaign);

module.exports = router;
