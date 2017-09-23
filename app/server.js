var express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(5000);
