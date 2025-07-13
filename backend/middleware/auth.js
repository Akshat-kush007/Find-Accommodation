const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.body.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not Found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
    
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
