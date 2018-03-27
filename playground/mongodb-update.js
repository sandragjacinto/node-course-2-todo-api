const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDb server');

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5abaab85d781f6cddf69349d')
    // },
    // {
    //     $set: {
    //         completed: true
    //     }
    // },
    // {
    //     returnOriginal: false
    // })
    // .then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // })

    //Users
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5abaa15c86b43e34e6dd4cab')
    },
    {
        $set: {
            name: 'Yvette'
        },
        $inc: {
            age: 1
        }
    },
    {
        returnOriginal: false
    })
    .then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })


    // db.close();
});