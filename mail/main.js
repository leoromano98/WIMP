var nodemailer = require("nodemailer");
var express = require("express");
var app = express();

app.post("/send-email", (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "lr290698@gmail.com",
      pass: "artuiis0001SSARHL",
    },
  });

  var mailOptions = {
    from: "lr290698@gmail.com",
    to: "lr290698@gmail.com",
    subject: "Enviado desde nodemailer",
    text: "Puto el que lee",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).jsonp(req.body);
      console.log(info);
    }
  });
});

app.listen(3000, () => {
  console.log("servidor en http://localhost:3000");
});
