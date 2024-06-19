const express = require("express");
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  contributeToCampaign,
  getUserCampaigns,
} = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createCampaign", authMiddleware, createCampaign);
router.get("/getCampaign", getCampaigns);
router.get("/getCampaign/:id", getCampaignById);
router.post(
  "/contributeToCampaign/:id",
  authMiddleware,
  contributeToCampaign
);
router.get("/getUserCampaigns", authMiddleware, getUserCampaigns);

module.exports = router;
