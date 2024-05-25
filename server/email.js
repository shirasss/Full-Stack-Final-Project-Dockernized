var nodemailer = require('nodemailer');


function Email(user, html) {
    var transporter = nodemailer.createTransport({
        // service: 'gmail',
        service: 'outlook',
        auth: {
            user: 'kidstore@outlook.co.il',
            pass:"Aa123456789"
        }
    });

    var mailOptions = {
        from: 'kidstore@outlook.co.il',
        to: user.user_email,
        subject: `Dear ${user.user_name}`,
        html: html,

    };
    // console.log(user.user_email);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    Email
}