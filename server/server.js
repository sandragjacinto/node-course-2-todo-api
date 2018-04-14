require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT;
// inside a rest API there the CRUD operation: creat read update and delete
// to create - use post hhtp method send resource as the body (JSON object) to server and the server will send back
app.use(bodyParser.json());

app.post ('/todos', authenticate, (req, res) => {
    var todo = new Todo ({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id //request the todos which request the id of the user
    })
        .then((todos) => {
            res.send({todos});
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});


// GET /todos/9890sdfsd ...

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    })
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

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    })
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

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

// Post /users
app.post('/users', (req, res) => {
    var body =  _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    // model methods called on User User.findByToken
    // instant method called on the individual user user.generateAuthToken

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => {
        res.status(400).send(err);
    })
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


//Post /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
    .then((user) => {
       return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((error) => {
        res.status(400).send();
    })
    
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(400).send();
        })
})


app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = {app};