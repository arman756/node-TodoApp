const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('unable to connect to database server', err);
  }
  console.log('connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  //   db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //     console.log(result)
  //   })

  // deleteOne
  //   db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //     console.log(result)
  //   })

  // findOneAndDelete
  //   db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((result) => {
  //     console.log(result)
  //   })

  db.collection('Todos').findOneAndDelete({ _id: new ObjectID('5ba4bf7e47ed5ef52a034a6a')}).then((result) => {
    console.log(result);
  });

  client.close();
});
