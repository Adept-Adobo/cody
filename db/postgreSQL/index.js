const { Client } = require('pg')
const client = new Client()
module.exports.db = await client.connect()
