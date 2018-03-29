const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})
// Todo.remove({})
//     .then((result => {
//         console.log(result);
//     }));

// Todo.findOneAndRemove()

// Todo.finByIdAndRemove()

Todo.findByIdAndRemove('5abd49b50a8eeb17a428c49c')
.then((todo) => {
    console.log(todo);
});