const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});