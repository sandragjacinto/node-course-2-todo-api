var express = require ('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
// inside a rest API there the CRUD operation: creat read update and delete
// to create - use post hhtp method send resource as the body (JSON object) to server and the server will send back
app.use(bodyParser.json());

app.post ('/todos', (req, res) => {
    var todo = new Todo ({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
});

app.get('/todos',  (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({todos});
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};