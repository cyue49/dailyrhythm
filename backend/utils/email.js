const nodemailer = require('nodemailer');

// sends a email
const sendEmail = (toUser, subject, content) => {
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toUser,
        subject: subject,
        text: content
    }

    const transporter = nodemailer.createTransport(config);

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email snet: ' + info.response);
        }
    })
}

exports.sendEmail = sendEmail;