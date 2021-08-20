const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.get("/", () => {
  // resizeBy.send("welcome to my form");
  console.log("app.get");
});

app.post("/api/form", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "lr290698@gmail.com",
      pass: "artuiis0001SSARHL",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "lr290698@gmail.com",
    subject: `Mensaje de ${data.name}`,
    html: `
      <h3> Holaaaaaaa </h3>
      <h1> PUTO EL QUE LEE </h1>
      `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
  });

  smtpTransport.close();
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`server starting ant port ${PORT}`);
});
