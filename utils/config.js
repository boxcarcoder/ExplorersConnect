require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let JWTSECRET = process.env.JWTSECRET;
module.exports = {
  PORT,
  MONGODB_URI,
  JWTSECRET
};
