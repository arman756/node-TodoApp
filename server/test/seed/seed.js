const { ObjectID } = require('mongodb');
const {Todo} = require('./../../models/Todo');
const {Users} = require('./../../models/Users');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'andrew@yahoo.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTowPass'
}];

const papulateUsers = (done) => {
  Users.deleteMany({}).then(() => {
    const userOne = new Users(users[0]).save();
    const userTwo = new Users(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333
}];

const papulateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => {
    done();
  });
};

module.exports = {todos,papulateTodos,users,papulateUsers};
