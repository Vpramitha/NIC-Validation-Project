const express = require("express");
const multer = require("multer");
const nicController = require("../controllers/nicController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("files"), nicController.uploadCSV);

router.get("/all", nicController.getAllNICs);

router.get("/file/:filename", nicController.getByFileName);

router.get("/summary",nicController.getSummery);

//router.get("/report/")
module.exports = router;