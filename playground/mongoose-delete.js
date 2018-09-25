const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {Users} = require('./../server/models/Users');

Todo.remove({}).then((result) => {
  console.log(result);
});

Todo.findOneAndDelete({ _id: '5baa166f10a37041a6452e02'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndDelete('5baa166f10a37041a6452e02').then((todo) => {
  console.log(todo);
});
