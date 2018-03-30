const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');


const {app} = require('./../server');
const {Todo} =require('./../models/todo');

const todos = [
    {
        text: 'First test todo',
        _id: new ObjectID()
    },
    {
        text: 'Second test todo',
        _id: new ObjectID(),
        completed: true,
        completedAt: 333
    }
];

beforeEach((done) => {
    Todo.remove({})
    .then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text})
                .then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch((err) => done(err));
            });
    });

    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find()
                .then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                })
                .catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    })
});


describe('DELETE /todos/:id', () => {
    it('should delete todo doc', (done) => {
        var hexId = todos[1]._id.toHexString();
        
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId)
                    .then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    })
                    .catch((err) => done(error));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    })
});


describe('PATCH /todos/:id', () => {
    it('should update todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = "hello, I'm different";
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
           .end(done)
    })

    it('should clear completedAt when todo not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = "hello, I'm different again";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
           .end(done)
    });
});