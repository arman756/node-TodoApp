// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('unable to connect to server');
  }
  console.log('connected to MongoDB server');

  const db = client.db('TodoApp'); // specifies the database

  db.collection('Todos') // specifies the collection
    .insertOne({ // specifies one document
      text: 'something to do',
      completed: false
    }, (err, result) => {
      if (err) {
        return console.log('unable to insert todo', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    });

  db.collection('Users').insertOne({
    // _id: 123,
    name: 'Andrew',
    age: 22,
    location: 'philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert a document to collection', err);
    }
    // console.log(JSON.stringify(result.ops, undefined, 2))
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});

// MongoClient.connect('mongodb://localhost:27017/Users', (err, client) => {
//   if (err) {
//     return console.log('unable to connect to database server "User".')
//   }
//   console.log('connected to server.')
//   const db = client.db('Users')
//   db.collection('user').insertOne({
//     name: 'Andrew',
//     age: 25,
//     location: 'philadelphia'
//   }, (err, result) => {
//     if (err) {
//       return console.log('unable to insert a document to collection', err)
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2))
//   })

//   client.close()
// })
