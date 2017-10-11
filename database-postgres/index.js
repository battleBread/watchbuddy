const Sequelize = require('sequelize');
const { Client } = require('pg');

const client = new Client({
  user: 'bs',
  host: 'localhost',
  database: 'bs',
  password: '',
  port: 5423,
});