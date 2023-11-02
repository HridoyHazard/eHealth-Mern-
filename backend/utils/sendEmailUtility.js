import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  console.log(EmailTo, EmailText, EmailSubject);
  try {
    let transporter = nodemailer.createTransport({
      host: "mail.teamrabbil.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@teamrabbil.com",
        pass: "~sR4[bhaC[Qs",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mail = await transporter.sendMail({
      from: "info@teamrabbil.com",
      to: EmailTo,
      subject: EmailSubject,
      text: "Hello world?",
      html: EmailText,
    });
    console.log("send mail success");
  } catch (error) {
    console.log(error);
  }
};
export default SendEmailUtility;
