const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

async function auth(req, res, next) {
  try {
    // Get the token from the request headers
    const token = req.headers.token;

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    // Find the user in the database using the decoded payload and the token
    if (decoded.role === "user") {
      user = await userModel.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
    } else if (decoded.role === "admin" || decoded.role === "superAdmin") {
      user = await adminModel.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
    }

    if (!user) {
      throw new Error("Invalid token");
    }

    // Check if the token is in the user's list of active tokens
    const tokenIndex = user.tokens.findIndex((tokenObj) => {
      return tokenObj.token === token;
    });

    if (tokenIndex === -1) {
      throw newerror("Token not found in database");
    }

    // Attach the user object to the request object for use in subsequent middleware or route handlers
    req.user = user;
    req.token = token;
    req.role = decoded.role;

    next();
  } catch (err) {
    // return error message
    res.status(401).send(err.message);
  }
}

module.exports = auth;
