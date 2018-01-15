'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config()
const kue = require('kue')



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD
  }
});

let sendAnsweredNotif = (notifInfo) => {
  console.log('sending email...')
  let queue = kue.createQueue();
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Hack Flow" <hackflow.norther@gmail.com>', // sender address
    to: notifInfo.question.author.email, // list of receivers
    subject: 'Hack Flow - Question answered', // Subject line
    text: 'Hello world 222?', // plain text body
    html: `<h3>${notifInfo.question.author.userName}, your question..<br/>
${notifInfo.question.title}: ${notifInfo.question.content} <br/>
received answer from <br/>
${notifInfo.answerer.userName} <br>
${notifInfo.answerContent}</h3>` // html body
  };

  var job = queue.create('email', {
    title: `Mail notification for ${notifInfo.question.author.userName}`,
    to: notifInfo.question.author.email,
    template: 'welcome-email',
    options: mailOptions
  }).save(function (err) {
    if (!err) console.log(job.id);
  });

  // send mail with defined transport object
  let email = (opt, done) => {
    console.log('inside process...............', opt)
    transporter.sendMail(opt, (error, info) => {
      if (error) {
        return console.log(error);
        done(err)
      }
      done()
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

  queue.process('email', 1, function (job, done) {
    
    email(mailOptions, done);
  });




}
module.exports = sendAnsweredNotif