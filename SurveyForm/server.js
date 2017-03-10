var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/result', function(req, res) {
    console.log(req.body);
    res.render('results',{results: req.body});
});

// app.get('/result', function(req, res) {
//     console.log(req.body);
//     res.render('results', {results: req.body});
// });

app.listen(8000);
