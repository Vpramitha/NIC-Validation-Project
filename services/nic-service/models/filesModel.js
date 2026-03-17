const db = require("../config/db");

// Insert file and return inserted ID
exports.saveFile = async (file_name) => {

  const sql = `
    INSERT INTO files (file_name)
    VALUES (?)
  `;

  const [result] = await db.execute(sql, [file_name]);

  return result.insertId; // important
};


// Update totals after processing
exports.updateFileCounts = async (id, total_records, valid_records) => {

  const sql = `
    UPDATE files
    SET total_records = ?, valid_records = ?
    WHERE id = ?
  `;

  await db.execute(sql, [total_records, valid_records, id]);

};