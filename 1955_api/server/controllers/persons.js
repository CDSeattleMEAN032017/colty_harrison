var mongoose = require('mongoose'),
    People = mongoose.model('People');

module.exports = {
    index: function(req, res) {
        People.find({}, function(err, people) {
            if (err) {
                console.log(err);
            } else {
                res.json(people);
            }
        });
    },
    create: function(req, res) {
        var person = new People({
            name: req.params.name
        });
        person.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },
    destroy: function(req, res) {
        People.remove({name: req.params.name}, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    },
    show: function(req, res) {
        People.findOne({name: req.params.name}, function(err, person) {
            if (err) {
                console.log(err);
            } else {
                res.json(person);
            }
        });
    }
};
