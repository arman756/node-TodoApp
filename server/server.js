const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {Users} = require('./models/Users');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //   console.log(req.body)
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

// const app = express()

// app.use(bodyParser.json())

// app.post('/users', (req, res) => {
//   const user = new Users({
//     email: req.body.email,
//     password: req.body.password
//   })

//   user.save().then((doc) => {
//     res.send(doc)
//   }, (e) => {
//     res.status(400).send(e)
//   })
// })

// app.listen(3000, () => {
//   console.log('Started on port 3000')
// })

/*****************************************/
/*****************************************/
/*****************************************/

// const newTodo = new Todo({
//   text: 'Cook dinner'
// })

// newTodo.save().then(
//   doc => {
//     console.log('Saved todo', doc)
//   },
//   err => {
//     console.log('Unable to save todo')
//   }
// )

// const otherTodo = new Todo({
//   text: 'feed the cat',
//   completed: true,
//   completedAt: 123
// })

// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2),
//     (e) => {
//       console.log('unable to save', e)
//     })
// })

// const user = new Users({
//   text: 'Ariana',
//   completed: false
// })

// user.save().then((result) => {
//   console.log(result)
// }, (err) => {
//   console.log(err)
// })

// const newUser = new Users({
//   email: '   armanfc.enter@yahoo.com       ',
//   password: '   1234abcd   '
// })

// newUser.save().then((res) => {
//   console.log(res, undefined, 2)
// }, (err) => {
//   console.log('unable to add user')
// })