const config = require('../utils/config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization DENIED.' });
  }

  //if there is a token from the HTTP request, verify the token for authentication
  try {
    let decoded = jwt.verify(token, config.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is invalid.' });
  }
};
