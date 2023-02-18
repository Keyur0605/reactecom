const nodemailer = require("nodemailer");

const sendMail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "keyurstore8@gmail.com",
      pass: "hqlaaocsxgbiazub",
    },
  });
  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.sub,
    html: data.html,
    cc: data.cc,
    attachments: data.attachments,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // else {
    //   console.log("Email sent: " + info.response);
    // }
  });
};

module.exports.sendMail = sendMail;
