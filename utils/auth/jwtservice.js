const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = {
  async createAccessToken(data) {
    try {
      let accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
        expiresIn: "3 days",
      });
      return accessToken;
    } catch (error) {
      return;
    }
  },

  async authenticationCheck(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send({
      data: null,
      message: "Access denied. No token provided.",
      status:"Fail"
    });
  
    let access_token = token.split(' ');
  
    jwt.verify(access_token[1], ACCESS_TOKEN_SECRET, function(err, decoded) {
      if( err ){
        return res.status(403).send({
          data: null,
          message: "Invalid token or token Expired",
          status:"Fail"
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    })
  }

};
