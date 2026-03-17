const db = require("../config/db");

const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

const updatePassword = async (email, otp, newPassword) => {
  const [result] = await db.execute(
    "UPDATE users SET password = ? WHERE email = ? AND otp = ?",
    [newPassword, email, otp]
  );

  return result;
};

const storeOtp = async (email, otp) => {
  const query = `
    UPDATE users 
    SET otp = ?, 
        otp_expire_time = DATE_ADD(NOW(), INTERVAL 5 MINUTE)
    WHERE email = ?
  `;

  await db.execute(query, [otp, email]);
};

const createUser = async (username,email, password) => {
  const [result] = await db.execute(
    "INSERT INTO users (username,email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result;
};

const verifyOtp = async (email, otp) => {
  const [result] = await db.execute(
    `SELECT id 
     FROM users 
     WHERE email = ? 
     AND otp = ? 
     AND otp_expire_time > NOW()`,
    [email, otp]
  );

  return result;
};

module.exports = { findUserByUsername, createUser, findUserByEmail , updatePassword, storeOtp, verifyOtp};