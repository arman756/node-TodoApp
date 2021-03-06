require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {Users} = require('./models/Users');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  //   console.log(req.body)
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is not valid');
  }

  Todo.findById({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send('not found');
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
// res.send(req.params)
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is invalid');
  }

  Todo.findByIdAndDelete({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send('not found');
    }
    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body , ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is invalid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate({_id: id,_creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// app.post('/users', (req, res) => {
//   const body = _.pick(req.body, ['email', 'password'])
//   const user = new Users(body)
//   // {
//   //   // email: req.body.email,
//   //   // password: req.body.password
//   // }
//   user.save().then(() => {
//     // res.send(user)
//     return user.generateAuthToken()
//   }).then((token) => {
//     res.header('x-auth', token).send(user)
//   }).catch((e) => {
//     res.status(400).send(e)
//   })
// })

// app.get('/users/me', authenticate, (req, res) => {
//   res.send(req.user)
// })

// // POST /users/login {email,password}
// app.post('/users/login', (req, res) => {
//   const body = _.pick(req.body, ['email', 'password'])
//   Users.findByCredential(body.email, body.password).then((user) => {
//     return user.generateAuthToken().then((token) => {
//       res.header('auth', token).send({user})
//     })
//   }).catch((e) => {
//     res.status(400).send()
//   })
// })

// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send()
//   }, () => {
//     res.status(400).send()
//   })
// })
// app.get('/users', (req, res) => {
//   Users.find().then((users) => {
//     res.send({users})
//   }, (e) => {
//     res.status(400).send(e)
//   })
// })

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new Users(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  Users.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
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
