const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "APP_PORT": process.env.APP_PORT,
  "MAIL_USER": process.env.MAIL_USER,
  "MAIL_PASS": process.env.MAIL_PASS
}