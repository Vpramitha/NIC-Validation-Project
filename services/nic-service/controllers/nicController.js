const nicService = require("../services/nicService");
const nicModel = require("../models/nicModel");

exports.uploadCSV = async (req, res) => {

  try {

    if (!req.files /*|| req.files.length < 4*/) {
      return res.status(400).json({
        message: "You must upload more than 4 CSV files"
      });
    }

    const results = await nicService.processFiles(req.files);

    res.json({
      message: "Validation complete",
      //results
      summary: results   // send summary 
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};

exports.getAllNICs = async (req, res) => {

  const data = await nicService.getAll();

  res.json(data);

};

exports.getByFileName = async (req, res) => {

  const filename = req.params.filename;

  const data = await nicService.getByFile(filename);

  res.json(data);

};

exports.getSummery = async (req, res) => {

  try {

    const summary = await nicModel.getSummaryData();

    res.json(summary);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch summary"
    });

  }

};