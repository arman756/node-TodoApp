const mongoose = require('mongoose');

// const Users = mongoose.model('Users', {
//   text: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   },
//   completedAt: {
//     type: Number
//   }
// })

const Users = mongoose.model('users', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }, password: {
    type: String,
    trim: true
  }
});

module.exports = {Users};
