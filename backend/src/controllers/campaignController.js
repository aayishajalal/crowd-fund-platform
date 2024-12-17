const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new campaign
const createCampaign = async (req, res) => {
  const { title, description, goalAmount, deadline, milestoneAmount } = req.body;

  // Ensure the user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    // Create campaign with milestoneAmount field
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        goalAmount,
        deadline: new Date(deadline), // Convert deadline to Date object
        milestoneAmount, // Include milestoneAmount in campaign creation
        ownerId: req.user.id, // Make sure req.user.id exists after token validation
      },
    });
    res.status(201).json(campaign);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating campaign' });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany();
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error fetching campaigns' });
  }
};

// Get a specific campaign by ID
const getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await prisma.campaign.findUnique({ where: { id: parseInt(id) } });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error fetching campaign' });
  }
};

// Donate to a campaign
const donateToCampaign = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  // Ensure the user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    // Create a donation record
    await prisma.donation.create({
      data: {
        amount,
        campaignId: parseInt(id),
        userId: req.user.id,
      },
    });

    // Update the campaign's raisedAmount with the donation
    await prisma.campaign.update({
      where: { id: parseInt(id) },
      data: { raisedAmount: { increment: amount } },
    });

    res.status(201).json({ message: 'Donation successful' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error processing donation' });
  }
};

module.exports = { createCampaign, getAllCampaigns, getCampaignById, donateToCampaign };
