const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('unable to connect to server', err);
  }
  console.log('connected to server');

  const db = client.db('TodoApp');

  //   db.collection('Todos').findOneAndUpdate(
  //     {
  //       _id: new ObjectID('5ba4ecd147ed5ef52a034fe5')
  //     },
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     }, {
  //       returnOriginal: false
  //     }).then((result) => {
  //     console.log(result)
  //   })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5ba4f15f47ed5ef52a0351f4') // find the document
  },
    {
      $set: {
        name: 'Ariana' // set the name to Ariana
      },
      $inc: {
        age: -2 // decrease the age by 2
      }
    },
    {
      returnOriginal: false // returns updated document
    });

  client.close();
});
