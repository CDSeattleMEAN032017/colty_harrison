var mongoose = require('mongoose'),
    PeopleSchema = new mongoose.Schema({
        name: String
    }),
    People = mongoose.model('People', PeopleSchema);
