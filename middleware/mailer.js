const nodemailer = require('nodemailer');


exports.sendMail = (mailOptions) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'itsopeyemi@gmail.com',
          pass: 'h0pe%l0ve'
        }
      });
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}