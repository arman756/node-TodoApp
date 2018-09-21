const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('unable to connect to MongoDB database', err);
  }
  console.log('Connected to MongoDB database');
  const db = client.db('TodoApp');

  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to fetch documents', err);
  });

  db.collection('Users').find({name: 'Andrew'}).count().then((count) => {
    console.log(`Todos count: ${count}`);
  }).catch((err) => {
    console.log('unable to fetch data', err);
  });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch((err) => {
    console.log('unable to fetch data.', err);
  });

  client.close();
});
// 
