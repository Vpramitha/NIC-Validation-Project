const db = require("../config/db");

exports.saveNIC = async (data) => {

  const sql = `
    INSERT INTO nic_records (nic, birthday, age, gender, file_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  await db.execute(sql, [
    data.nic,
    data.birthday,
    data.age,
    data.gender,
    data.file_id
  ]);

};

exports.getAll = async () => {

  const [rows] = await db.execute("SELECT * FROM nic_records");

  return rows;

};

exports.getByFile = async (fileId) => {

  const [rows] = await db.execute(
    "SELECT * FROM nic_records WHERE file_id = ?",
    [fileId]
  );

  return rows;

};

/*exports.getSummaryData = async () => {

  // Total records
  const [total] = await db.execute(
    "SELECT COUNT(*) AS totalRecords FROM nic_records"
  );

  // Male count
  const [male] = await db.execute(
    "SELECT COUNT(*) AS maleUsers FROM nic_records WHERE gender = 'Male'"
  );

  // Female count
  const [female] = await db.execute(
    "SELECT COUNT(*) AS femaleUsers FROM nic_records WHERE gender = 'Female'"
  );

  // Average age
  const [avgAge] = await db.execute(
    "SELECT AVG(age) AS averageAge FROM nic_records"
  );

  // Records per file (JOIN with files table)
  const [recordsPerFile] = await db.execute(`
    SELECT f.file_name, COUNT(n.id) AS count
    FROM nic_records n
    JOIN files f ON n.file_id = f.id
    GROUP BY f.file_name
  `);

  // Document-wise male/female distribution
  const [genderPerFile] = await db.execute(`
    SELECT f.file_name, n.gender, COUNT(*) AS count
    FROM nic_records n
    JOIN files f ON n.file_id = f.id
    GROUP BY f.file_name, n.gender
    ORDER BY f.file_name
  `);

  // System usage in last 3 months
  const [usageLast3Months] = await db.execute(`
    SELECT DATE(created_at) AS date, COUNT(*) AS total
    FROM nic_records
    WHERE created_at >= CURDATE() - INTERVAL 3 MONTH
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `);

  return {
    totalRecords: total[0].totalRecords,
    maleUsers: male[0].maleUsers,
    femaleUsers: female[0].femaleUsers,
    averageAge: avgAge[0].averageAge,
    recordsPerFile,
    genderPerFile,
    usageLast3Months
  };
};*/

exports.getSummaryData = async () => {
  // Total records
  const [total] = await db.execute("SELECT COUNT(*) AS totalRecords FROM nic_records");

  // Male count
  const [male] = await db.execute("SELECT COUNT(*) AS maleUsers FROM nic_records WHERE gender = 'Male'");

  // Female count
  const [female] = await db.execute("SELECT COUNT(*) AS femaleUsers FROM nic_records WHERE gender = 'Female'");

  // Average age
  const [avgAge] = await db.execute("SELECT AVG(age) AS averageAge FROM nic_records");

  // Records per file
  const [recordsPerFile] = await db.execute(`
    SELECT f.file_name, COUNT(n.id) AS count
    FROM nic_records n
    JOIN files f ON n.file_id = f.id
    GROUP BY f.file_name
  `);

  // Gender per file
  const [genderPerFile] = await db.execute(`
    SELECT f.file_name, n.gender, COUNT(*) AS count
    FROM nic_records n
    JOIN files f ON n.file_id = f.id
    GROUP BY f.file_name, n.gender
    ORDER BY f.file_name
  `);

  // Usage last 3 months
  const [usageLast3Months] = await db.execute(`
    SELECT DATE(created_at) AS date, COUNT(*) AS total
    FROM nic_records
    WHERE created_at >= CURDATE() - INTERVAL 3 MONTH
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `);

  // Age groups
  const [ageGroups] = await db.execute(`
    SELECT 
      CASE
        WHEN age BETWEEN 0 AND 18 THEN '0-18'
        WHEN age BETWEEN 19 AND 30 THEN '19-30'
        WHEN age BETWEEN 31 AND 45 THEN '31-45'
        WHEN age BETWEEN 46 AND 60 THEN '46-60'
        ELSE '60+'
      END AS age_group,
      COUNT(*) AS count
    FROM nic_records
    GROUP BY age_group
    ORDER BY age_group
  `);

  // Top files
  const [topFiles] = await db.execute(`
    SELECT f.file_name, COUNT(*) AS total
    FROM nic_records n
    JOIN files f ON n.file_id = f.id
    GROUP BY f.file_name
    ORDER BY total DESC
    LIMIT 5
  `);

  // Monthly trend
  const [monthlyTrend] = await db.execute(`
    SELECT DATE_FORMAT(created_at,'%Y-%m') AS month, COUNT(*) AS total
    FROM nic_records
    GROUP BY month
    ORDER BY month
  `);

  return {
    totalRecords: total[0].totalRecords,
    maleUsers: male[0].maleUsers,
    femaleUsers: female[0].femaleUsers,
    averageAge: avgAge[0].averageAge,
    recordsPerFile,
    genderPerFile,
    usageLast3Months,
    ageGroups,
    topFiles,
    monthlyTrend
  };
};