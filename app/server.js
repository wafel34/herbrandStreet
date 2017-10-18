var express = require('express'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    credentials = require('./creds'),
    app = express();

var transporter =  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});


//nodemailer

app.post('/', function(req,res){
    var clientOptions = {
            to: req.body.email, // list of receivers
            subject: 'Contact Confirmation ✔', // Subject line
            html: // html body
            '<b>Hello '+req.body.name+'!</b>'+
            '<p>Thank you for contacting us, we will look into your query shortly and will contact you back!</p>'
        };

    transporter.sendMail(clientOptions, function(err, info){
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
       res.sendStatus(200);
       console.log('Message sent: %s', info.messageId);
       // Preview only available when sending through an Ethereal account
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    var adminOptions = {
            to: process.env.EMAIL, // list of receivers
            subject: 'New email query.', // Subject line
            html:
            '<p>From: '+req.body.name+'</p>'+
            '<p>Email: '+req.body.email+'</p>'+
            '<p>'+req.body.message+'</p>'
        };

    transporter.sendMail(adminOptions, function(err, info){
        if (err) {
           return console.log(err);
       }
       console.log('Message sent: %s', info.messageId);
       // Preview only available when sending through an Ethereal account
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});


app.listen(5000);
