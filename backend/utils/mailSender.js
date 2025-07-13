const nodemailer = require("nodemailer");

const mailSender = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Find Accommodation" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return info;
    
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};

module.exports = mailSender;
