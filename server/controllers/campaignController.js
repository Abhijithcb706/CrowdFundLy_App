const Campaign = require("../models/campaignModel");

exports.createCampaign = async (req, res) => {
  const { title, description, targetAmount, deadline } = req.body;
  try {
    const campaign = new Campaign({
      title,
      description,
      targetAmount,
      deadline,
      creator: req.user.id,
    });
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name");
    res.json(campaigns);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "creator",
      "name"
    );
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


exports.contributeToCampaign = async (req, res) => {
  const { amount } = req.body;
  try {
    let campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    campaign.currentAmount += amount;
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getUserCampaigns = async (req, res) => {
  try {
    const createdCampaigns = await Campaign.find({ creator: req.user.id });
    const supportedCampaigns = await Campaign.find({
      "supporters.user": req.user.id,
    });
    res.json({ created: createdCampaigns, supported: supportedCampaigns });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
