const client = require('./../connect')
const logger = require('../../winston')

const createPosts = async () => {
    try {
   await client.query(`
    CREATE TABLE IF NOT EXISTS posts (
        post_id serial PRIMARY KEY,
        title VARCHAR (50) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR (50),
        creation_date TIMESTAMP NOT NULL DEFAULT NOW()
        )`)
        console.log('Table with posts created')

    } catch (error) {
        logger.error(error.stack)
    }
}

module.exports = createPosts