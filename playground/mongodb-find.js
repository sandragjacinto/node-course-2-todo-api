const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDb server');

    // db.collection('Todos').find({completed: false}).toArray() //gets us an array instead of a pointer returns a promise
    // db.collection('Todos').find({
    //     _id: new ObjectID('5abaa54ed781f6cddf693347')
    // }).toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     })
    //     .catch((err) => {
    //         console.log('Unable to fetch todos', err);
    //     })

    // db.collection('Todos').find().count()
    //     .then((count) => {
    //         console.log(`Todos count : ${count}`);
    //     })
    //     .catch((err) => {
    //         console.log('Unable to fetch todos', err);
    //     })


        db.collection('Users').find({name: 'Sandra'}).toArray()
        .then((docs) => {
            console.log('Users :');
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log('Unable to fetch todos', err);
        })
    // db.close();
});