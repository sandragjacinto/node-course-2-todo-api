const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5abd32190eed9d48d037e54e11';


// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// })
// .then((todos) => {
//     console.log('Todos ;', todos); //gets an array
// });

// Todo.findOne({
//     _id: id
// })
// .then((doc) => {
//     if (!doc) {
//         return console.log('Id not found');
//     }
//     console.log('Todo :', doc); //gets an object
// });

// Todo.findById(id)
// .then((doc) => {
//     if (!doc) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id:', doc); //gets an object by ID
// })
// .catch((error) => {
//     console.log(error);
// })

var id ='5abab7875a61543c502d8b20';

User.findById(id)
.then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User by ID :', JSON.stringify(user, undefined, 2));
})
.catch((error) => {
    console.log(error);
})