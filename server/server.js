const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {Users} = require('./models/Users');

const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is not valid');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('not found');
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
// res.send(req.params)
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is invalid');
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('not found');
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body , ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send('id is invalid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port port ${port}`);
});

module.exports = {app};

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
