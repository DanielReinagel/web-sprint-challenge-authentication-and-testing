const jwt = require("jsonwebtoken");
const secret = require("../secret");
const model = require("../auth/auth-model");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) res.status(401).json({message:"Token required"});
  else {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) res.status(401).json({message:"Token invalid"});
      else {
        req.object = decoded;
        model.getById(decoded.subject)
          .then(user => user ? next() : res.status(401).json({message:"Token invalid"}));
      }
    })
  }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
