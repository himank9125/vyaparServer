const jwt = require("jsonwebtoken");

const AuthLog = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({ error: "No Token Found" });
    }
    const verify = jwt.verify(token, process.env.JWT_TOKEN_KEY_PART);
    if (!verify) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    req.userId = verify.id;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = AuthLog;
