import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

  console.log( "dukse")
  let transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log()

  let mailOptions = {
    from: "Task Manager MERN <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};
export default SendEmailUtility;
