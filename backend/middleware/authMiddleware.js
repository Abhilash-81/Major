const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized,Invalid Token" });
    }
  } else {
    res.status(401).json({ Message: "Not Authorized,No Token" });
  }
});

module.exports = {
  protect,
};
