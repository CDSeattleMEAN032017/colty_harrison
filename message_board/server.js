var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board');
var MessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    dateAdded: {
        type: Date,
        default: Date.now()
    }
});
var CommentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    _message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
});
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    Message.find({})
    .sort({
        dateAdded: -1
    })
        .populate('comments')
        .exec(function(err, messages) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {messages: messages});
            }
        });
});

app.post('/messages', function(req, res) {
    var message = new Message({
        name: req.body.name,
        message: req.body.message,
        comments: []
    });
    message.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/messages/:id', function(req, res) {
    Message.findById(req.params.id, function(err, message) {
        if (err) {
            console.log(err);
        } else {
            var comment = new Comment(req.body);
            comment._message = message._id;
            message.comments.push(comment);
            comment.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    message.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        }
                    });
                }
            });
        }
    });
});

app.listen(8000, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on 8000');
    }
});
