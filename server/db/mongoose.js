// const mongoose = require('mongoose')

// mongoose.Promise = global.Promise
// // mongoose.connect('mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab' || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
// // mongoose.connect('mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab' || 'mongodb://127.0.0.1:27017:27017/TodoApp', { useNewUrlParser: true })

// // process.env.MONGODB_URI = 'mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab'
// const localhost = '127.0.0.1:27017'

// mongoose.connect(`mongodb://${localhost}:27017/TodoApp`, { useNewUrlParser: true })

// // console.log(process.env.MONGODB_URI); // mongodb://localhost:27017/TodoApp

// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
// // mongoose.connect(
// //   'mongodb://localhost:27017/TodoApp',
// //   { useNewUrlParser: true }
// // )

// module.exports = {mongoose}

// var mongoose = require('mongoose')

// const localhost = '127.0.0.1:27017'
// // process.env.MONGODB_URI = 'mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab'

// mongoose.Promise = global.Promise
// // mongoose.connect(process.env.MONGODB_URI || `mongodb://${localhost}:27017/TodoApp`, { useNewUrlParser: true })
// mongoose.connect('mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab' || `mongodb://${localhost}:27017/TodoApp`, { useNewUrlParser: true })

// console.log(process.env.MONGODB_URI); // mongodb://localhost:27017/TodoApp

// module.exports = { mongoose}

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// befor the code below, you need to run : 
// $heroku config:set MONGODB_URI=mongodb: // <dbuser>:<dbpassword>@ds113693.mlab.com:13693/herokumlab

// in this case, we have:
// heroku config:set MONGODB_URI=mongodb://armandomlab:arbamlab756@ds113693.mlab.com:13693/herokumlab
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/TodoApp', { useNewUrlParser: true });
console.log(process.env.MONGODB_URI); // mongodb://localhost:27017/TodoApp

module.exports = { mongoose};
