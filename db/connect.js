const { Client } = require('pg')
const client = new Client({
  host:'localhost',
  port:5432,
  database:'postgres',
  user:'postgres',
  password:'1234'
}

)
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to db')
  }
})

module.exports = client