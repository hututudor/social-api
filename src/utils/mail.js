const nodemailer = require('nodemailer');

const sendConfirmationMail = async (email, confirmation) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `Social API ${process.env.MAIL_USER}`,
      to: email,
      subject: 'Confirmation',
      html: `<a href="${process.env.API_URL}/auth/confirm/${confirmation}">Confirm your account</a>`
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  sendConfirmationMail
};
