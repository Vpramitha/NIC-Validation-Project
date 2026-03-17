exports.validateNIC = (nic) => {

  if (!nic) return null;

  nic = nic.trim();

  let year, dayOfYear, gender;

  if (/^\d{9}[vV]$/.test(nic)) {
    year = parseInt("19" + nic.substring(0, 2));
    dayOfYear = parseInt(nic.substring(2, 5));
  }
  else if (/^\d{12}$/.test(nic)) {
    year = parseInt(nic.substring(0, 4));
    dayOfYear = parseInt(nic.substring(4, 7));
  }
  else {
    return null;
  }

  if (dayOfYear > 500) {
    gender = "Female";
    dayOfYear -= 500;
  } else {
    gender = "Male";
  }

  const birthday = new Date(year, 0);
  birthday.setDate(dayOfYear);

  const age = new Date().getFullYear() - year;

  return {
    nic,
    birthday: birthday.toISOString().split("T")[0],
    age,
    gender
  };
};