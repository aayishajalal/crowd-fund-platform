const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createCampaign = async (req, res) => {
  const { title, description, goalAmount, deadline } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        goalAmount,
        deadline: new Date(deadline),
        ownerId: req.user.id, // Make sure req.user.id exists after token validation
      },
    });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: 'Error creating campaign' });
  }
};


const getAllCampaigns = async (req, res) => {
  const campaigns = await prisma.campaign.findMany();
  res.json(campaigns);
};

const getCampaignById = async (req, res) => {
  const { id } = req.params;
  const campaign = await prisma.campaign.findUnique({ where: { id: parseInt(id) } });
  res.json(campaign);
};

const donateToCampaign = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    await prisma.donation.create({
      data: {
        amount,
        campaignId: parseInt(id),
        userId: req.user.id,
      },
    });

    await prisma.campaign.update({
      where: { id: parseInt(id) },
      data: { raisedAmount: { increment: amount } },
    });

    res.status(201).json({ message: 'Donation successful' });
  } catch (error) {
    res.status(400).json({ error: 'Error processing donation' });
  }
};

module.exports = { createCampaign, getAllCampaigns, getCampaignById, donateToCampaign };
