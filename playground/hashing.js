const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');
console.log(`decoded: ${JSON.stringify(decoded)}`);

// const message = 'I am user number 3'
// const hash = SHA256(message).toString()

// console.log(`HASH: ${hash}`)

// const data = {
//   id: 4
// }

// const token = {
//   data: data,
//   hash: SHA256(JSON.stringify(message)).toString(),
//   hash2: SHA256(JSON.stringify(message) + 'somesecret').toString()
// }

// token.data.id = 5
// token.hash2 = SHA256(JSON.stringify(token.data)).toString()

// // const resultHash = SHA256(JSON.stringify(token.data))
// const resultHash = SHA256(JSON.stringify(token.hash2 + 'somesecret').toString())
// const resultHash2 = SHA256(JSON.stringify(token.data + 'somesecret').toString())

// console.log(resultHash)
// console.log(resultHash2)
