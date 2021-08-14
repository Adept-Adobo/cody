const { Client } = require('pg');
const login = require('../../env/config');
const client = new Client(login);
client.connect();

module.exports = client;


