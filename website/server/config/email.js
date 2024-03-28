const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "oetoliservice@gmail.com",
    pass: "qzcr ntcy svjw wjqp",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { smtpTransport };
