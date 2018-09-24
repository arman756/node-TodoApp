const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');
const {Users} = require('./../models/Users');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST .todos', () => {
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

        Todo.find().then((doc) => {
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
          expect(doc.length).toBe(0); // 0 , because there is no doc in DB, all docs have wiped by beforeEach()
          done();
        }).catch((e) => {
          done(e);
        });
      });
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
