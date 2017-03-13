var mongoose = require('mongoose'),
    People = mongoose.model('People'),
    persons = require('../controllers/persons.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        persons.index(req, res);
    });

    app.get('/new/:name/', function(req, res) {
        persons.create(req, res);
    });

    app.get('/remove/:name', function(req, res) {
        persons.destroy(req, res);
    });

    app.get('/:name', function(req, res) {
        persons.show(req, res);
    });
};
