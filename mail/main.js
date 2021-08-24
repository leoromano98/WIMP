var nodemailer = require("nodemailer");
var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send-email", (req, res) => {
  console.log("Got body:", req.body);
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
    text: req.body.text,
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
