const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {Users} = require('./../server/models/Users');

const id = '5ba8ca4c222aa254c42a5b8a';
const user_id = '5ba761e275ec8383d173c161';

if (!ObjectID.isValid(id)) {
  console.log('id is invalid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos: ', todos);
});

Todo.findOne({_id: id}).then((todo) => {
  console.log('todo is: ', todo);
});

Todo.findById(id).then((todo) => {
  console.log('todo is:', todo);
});

Users.findById(user_id).then((user) => {
  if (!user) {
    return console.log('unable to find user');
  }
  //   console.log('that specific user is: ', user)
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
