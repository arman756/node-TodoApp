const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
    unique: true,
    validate: {
      // validator: (value) => {
      //   return validator.isEmail(value)
      // }, or
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(),access} , process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: { token}
    }
  });
};

// UserSchema.statics.findByToken = function (token) {
//   const Users = this
//   let decoded
//   try {
//     decoded = jwt.verify(token, 'abc123')
//   } catch (e) {
//     // return new Promise((resolve,reject)=>{
//     //   reject()
//     // })
//     return Promise.reject()
//   }

//   return Users.findOne({
//     '_id': decoded._id,
//     'tokens.token': token,
//     'token.access': 'auth'
//   })
// }

// const Users = mongoose.model('users', UserSchema)

// module.exports = {Users}

UserSchema.statics.findByToken = function (token) {
  const Users = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    // return new Promise((resolve,reject)=>{
    //   reject()
    // })
    return Promise.reject();
  }

  return Users.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredential = function (email, password) {
  const Users = this;
  return Users.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else {
    next();
  }
});

const Users = mongoose.model('User', UserSchema);

module.exports = {Users};

// const mongoose = require('mongoose')
// const validator = require('validator')
// const jwt = require('jsonwebtoken')
// const _ = require('lodash')
// const bcrypt = require('bcryptjs')

// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//     unique: true,
//     validate: {
//       validator: validator.isEmail,
//       message: '{VALUE} is not a valid email'
//     }
//   },
//   password: {
//     type: String,
//     require: true,
//     minlength: 6
//   },
//   tokens: [{
//     access: {
//       type: String,
//       required: true
//     },
//     token: {
//       type: String,
//       required: true
//     }
//   }]
// })

// UserSchema.methods.toJSON = function () {
//   var user = this
//   var userObject = user.toObject()

//   return _.pick(userObject, ['_id', 'email'])
// }

// UserSchema.methods.generateAuthToken = function () {
//   var user = this
//   var access = 'auth'
//   var token = jwt.sign({ _id: user._id.toHexString(), access}, 'abc123').toString()

//   user.tokens.push({ access, token})

//   return user.save().then(() => {
//     return token
//   })
// }

// UserSchema.methods.removeToken = function (token) {
//   var user = this

//   return user.update({
//     $pull: {
//       tokens: { token}
//     }
//   })
// }

// UserSchema.statics.findByToken = function (token) {
//   var Users = this
//   var decoded

//   try {
//     decoded = jwt.verify(token, 'abc123')
//   } catch (e) {
//     return Promise.reject()
//   }

//   return Users.findOne({
//     '_id': decoded._id,
//     'tokens.token': token,
//     'tokens.access': 'auth'
//   })
// }

// UserSchema.statics.findByCredentials = function (email, password) {
//   var Users = this

//   return Users.findOne({ email}).then((user) => {
//     if (!user) {
//       return Promise.reject()
//     }

//     return new Promise((resolve, reject) => {
//       // Use bcrypt.compare to compare password and user.password
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           resolve(user)
//         } else {
//           reject()
//         }
//       })
//     })
//   })
// }

// UserSchema.pre('save', function (next) {
//   var user = this

//   if (user.isModified('password')) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash
//         next()
//       })
//     })
//   } else {
//     next()
//   }
// })

// var Users = mongoose.model('Users', UserSchema)

// module.exports = { Users}
