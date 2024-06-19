const express = require("express");
const connectDb = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const campaignRoutes = require('./routes/campaignRoutes')
const dotenv = require("dotenv");
dotenv.config();

connectDb();

const app = express();
app.use(express.json());

app.use('/crowdFundLy/user', userRoutes);
app.use('/crowdFundLy/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
