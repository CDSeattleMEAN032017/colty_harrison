var http = require('http');
var fs = require('fs');
var mathl = require('./mathlib');
var server = http.createServer(function(request, response) {
    console.log("request", request);
    console.log("response", response);
    console.log('add: 4 + 5', mathl.add(4,5));
    console.log('multiply: 10 * 6', mathl.multiply(4,5));
    console.log('square: 25', mathl.square(25));
    console.log('random: 1 - 35', mathl.random(1,35));


});

server.listen(6789);
