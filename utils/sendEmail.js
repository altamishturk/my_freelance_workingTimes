const nodemailer = require('nodemailer');



module.exports = async (to,subject,htmlBody)=>{

  let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
        host: 'smtp@gmail.com',
        port: 465,
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
          },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMTP_MAIL, 
    to: to, 
    subject: subject, 
    html: htmlBody,
  });

  
  return info;
}