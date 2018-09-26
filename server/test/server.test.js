const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');
const {Users} = require('./../models/Users');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo'
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    const text = 'test todo text';

    request(app)
      .post('/todos')
      .send({text}) // sending this data
      .expect(200) // expectiong request
      .expect((res) => { // expectiong result
        expect(res.body.text).toBe(text); // res.body must have a property named text, with value of test todo text
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((doc) => {
          expect(doc.length).toBe(1); // we expect the doc to have the length of 1
          expect(doc[0].text).toBe(text); // and we expect the first doc property to have the text value
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
  it('Should not create a todo with invalid body data', (done) => {
    request(app)
      .post('/todos') // sending to same url
      .send({}) // invalid body data
      .expect(400) // "Bad Request"
      .end((err, res) => {
        if (err) {
          return done(err); // must use return , if not , you catch Error: done() called multiple times
        }

        Todo.find().then((doc) => {
          expect(doc.length).toBe(2); // 0 , because there is no doc in DB, all docs have wiped by beforeEach()
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
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

    it('should return 404 if todo not found', (done) => {
      const hexId = new ObjectID().toHexString();
      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    const hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexID).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
  it('Should return 404 if todo not found', (done) => {
    const hexID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });
  it('Should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123abc`)
      .expect(404)
      .end(done);
  });
});
// beforeEach((done) => {
//   Todo.remove({}).then(() => done())
// })

// describe('POST /todos', () => {
//   it('Should create a new todo', (done) => {
//     const text = 'test todo text'

//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text)
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err)
//         }

//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(1)
//           expect(todos[0].text).toBe(text)
//           done()
//         }).catch((e) => {
//           done(e)
//         })
//       })
//   })
// })
