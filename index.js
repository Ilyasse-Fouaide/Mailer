const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const config = require("./config")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/send', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Please provide you info before you submit!." });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: config.MAIL_USER,
    subject: 'Contact me',
    text: `Email: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(200).json(info);
  });
});

const port = config.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
