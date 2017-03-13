var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
var routes = require('./server/config/front_end_routes.js');
routes(app);

app.listen(5000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on 5000!');
    }
});
