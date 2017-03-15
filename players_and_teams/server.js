var express = require('express'),
    app = express(),
    path = require('path'),
    bp = require('body-parser');

app.use(bp.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(8000, function() {
    console.log('Listening on port 8000');
});
