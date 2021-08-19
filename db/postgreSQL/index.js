const { Pool } = require('pg');
const login = require('../../env/config');
const client = new Pool(login);
client.connect();

module.exports = client;


