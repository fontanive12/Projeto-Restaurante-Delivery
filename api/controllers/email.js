var nodemailer = require('nodemailer');
let email_user = 'franciele.fontanive@universo.univates.br';
let email_pass = 'Fran458932';
let email_to = 'fontanive12@gmail.com';
let email_subject = 'Oieeeeeeeeeee';
let email_html = "teste";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_user,
        pass: email_pass
    }
});
    
var mailOptions = {
    from: email_user,
    to: email_to,
    subject: email_subject,
    html: email_html
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Erro ao enviar e-mail: ' + error)
    } else {
        console.log('E-mail enviado: ' + info.response);
    }
})











