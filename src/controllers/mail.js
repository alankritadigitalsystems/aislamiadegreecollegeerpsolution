import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: '465',
    secure: 'true',
    auth: {
        user: 'project.college@naveenrao.com',
        pass: 'UniGrad@123'
    }
})

const Mail = () => {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
}

function du(from, to, subject, msg) {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
}

// const mailOptions = {
//     from: 'project.college@naveenrao.com',
//     to: 'iqlipsen@gmail.com',
//     subject: 'new mail',
//     text: 'testing'
// };

// transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//         console.log(err)
//     else
//         console.log(info);
// });