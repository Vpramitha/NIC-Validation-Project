const express = require("express");
const cors = require("cors");
const nicRoutes = require("./routes/nicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/nic", nicRoutes);

app.listen(5002, () => {
  console.log("NIC Service running on port 5002");
});