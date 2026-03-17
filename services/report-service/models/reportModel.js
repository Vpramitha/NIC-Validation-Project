const db = require("../config/db");

const findNICsBydate = async (startDate, endDate) => {
    const [rows] = await db.execute(
    "SELECT * FROM nic_records WHERE created_at BETWEEN ? AND ?",
    [startDate, endDate]
  );

  console.log([rows]);

  return rows;
};

/*const findNICByAdvanced = async (enterFrom, enterTo, birthdayFrom, birthdayTo, ageFrom, ageTo, gender)=>{
  
    const query = "SELECT * FROM nic_records WHERE created_at BETWEEN ? AND ?"
 
}*/


module.exports = { findNICsBydate};