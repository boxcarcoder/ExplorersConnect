require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let JWTSECRET = process.env.JWTSECRET;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  PORT,
  MONGODB_URI,
  JWTSECRET,
};
