const client = require('./../connect')

const createUsers = () => {
    client.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        password VARCHAR (50) NOT NULL,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP
        )`)
    console.log('created users table')

}
module.exports = createUsers