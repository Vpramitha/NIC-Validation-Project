const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/report", authRoutes);

const PORT = 5003;

app.listen(PORT, () => {
  console.log(`Report Service running on port ${PORT}`);
});