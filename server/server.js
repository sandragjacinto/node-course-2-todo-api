const {ObjectID} = require('mongodb');

var express = require ('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
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


// GET /todos/9890sdfsd ...

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            };
            res.send({todo});
        })
        .catch((error) => {
            res.status(400).send();
        }); 
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            res.status(200).send({todo});
        })
        .catch((error) => {
            res.status(400).send();
        });
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = {app};