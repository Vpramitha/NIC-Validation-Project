const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  /*const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Token required" });
  }*/

  //const token = authHeader.split(" ")[1];
  const authHeader = req.headers.authorization || "";
const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

if (!token) {
  return res.status(403).json({ message: "Token required" });
}

  try {

    const decoded = jwt.verify(token, "my_super_secret_key");

    req.user = decoded;

    next();

  } catch (error) {

   res.status(401).json({ 
  message: "Invalid token",
  error: error.message // or error.toString()
});

  }
};

module.exports = verifyToken;