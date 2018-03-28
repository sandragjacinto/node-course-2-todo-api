
var {mongose} = require('./db/mogoose.js');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var newTodo = new Todo({
    
});

// newTodo.save()
//     .then((doc) => {
//         console.log('Saved todo :', doc);
//     })
//     .catch((err) => {
//         console.log('Unable to save');
//     });


var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var newUser  = new User ({
    email: 'sgj@g.com'
});

newUser.save()
    .then((doc) => {
        console.log('Saved new user :');
        console.log(JSON.stringify(doc, undefined, 2));
    })
    .catch((err) => {
        console.log('Unable to save new User'), err;
    })