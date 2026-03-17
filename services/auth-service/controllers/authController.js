const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vidulpramitha2000@gmail.com",
    pass: "wqgv pdhr gweq yyjc", // NOT your real password
  },
});

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await userModel.findUserByUsername(username);

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {

    const { username , password } = req.body;

    const user = await userModel.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOTP=async (req,res) =>{
  const { email } = req.body;
  const user = await userModel.findUserByEmail(email);
  if(!user){
    return res.status(401).json({ message: "There is no user registered with this email." });
  }
  const OTP = Math.floor(100000 + Math.random() * 900000);
  console.log(OTP); 
 //api call for sent otp

 // 📧 Send Email
  await transporter.sendMail({
    from: "vidulpramitha2000@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${OTP}`,
  });
  
 //db update of api
 userModel.storeOtp(email,OTP);
  return res.status(200).json({message:"OTP was sent to the email"});
}

const verifyOTP = async (req, res) => {
  const { email, OTP } = req.body;

  const response = await userModel.verifyOtp(email, OTP);

  if (response.length === 1) {
    return res.status(200).json({
      message: "OTP verified successfully"
    });
  }

  return res.status(400).json({
    message: "Invalid OTP"
  });
};

const resetPassword = async (req,res) =>{
  const {email, OTP, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.updatePassword(email, OTP, hashedPassword);
  return res.status(200).json({message:"password updated successfully"})
}



module.exports = { register, login, createOTP, resetPassword, verifyOTP };