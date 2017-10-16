var express = require('express'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser');
    app = express();

var transporter =  nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: ''  // generated ethereal password
    }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});


//nodemailer

app.post('/', function(req,res){
    console.log(req.body.email);
});

app.get('/send',function(req,res){

    var mailOptions = {
            from: 'wafel34@op.pl', // sender address
            to: 'wafel34@op.pl', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
           return console.log(err);
       }
       console.log('Message sent: %s', info.messageId);
       // Preview only available when sending through an Ethereal account
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    e.preventDefault();

});

app.listen(5000);
