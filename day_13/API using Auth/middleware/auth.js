const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = process.env;

const verifyToken = async (req, res, next) => {
  let token =
    (await req.headers["authorization"]) || req.body.token || req.query.token;
  console.log(token);
  if (token) {
    TokenArray = token.split(" ");
  }

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(TokenArray[1], config.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
