const nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
  auth: {
    user: 'gaurav14669@gmail.com', // Admin Gmail ID
    pass: 'nwpusfszwfwqsonc', // Admin Gmail Password
  },
})
module.exports = transporter;
 

