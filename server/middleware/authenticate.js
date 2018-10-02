// const {Users} = require('./../models/Users')

// const authenticate = (req, res, next) => {
//   const token = req.header('x-auth')

//   Users.findByToken(token).then((user) => {
//     if (!user) {
//       return Promise.reject()
//     }

//     req.user = user
//     req.token = token
//     next()
//   }).catch((e) => {
//     res.status(401).send()
//   })
// }

// module.exports = {authenticate}

var { Users } = require('./../models/Users');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  Users.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = { authenticate};
