const Sequelize = require('sequelize');
const { userSchema } = require('./schema');
const { POSTGRES: { USER, PASSWORD, HOST }} = require('../config');

const sequelize = new Sequelize('watchpotato', USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
});

const User = sequelize.define('user', userSchema);

User.sync();

module.exports = {
  User
};

/**
 * /////////////////////
 * // POSTGRES SETUP: //
 * /////////////////////
 * 
 * (NB: Bash commands preceded by $, ex: $ echo 'hello world')
 * 
 * 1. Install Homebrew
 * 2. Install Postgres with Homebrew: 
 *      $ brew install postgres
 * 3. Create a new Postgres DB cluster: 
 *      $ initdb /usr/local/var/postgres
 * 4. Create a 'postgres' user (fill in version w/ your postgres version): 
 *      $ /usr/local/Cellar/postgresql/<version>/bin/createuser -s postgres
 * 5. Start the server: 
 *      $ brew services start postgresql
 * 6. Create the 'watchpotato' database using 'postgres' user: 
 *      $ createdb -O postgres watchpotato
 * 
 * --To view the tables (schema),
 *   - type: 'psql -U postgres'
 *   - followed by '\c watchpotato'
 *   - followed by '\dt'
 *   - to see all rows in a table: 'SELECT * FROM <tablename>;'
 * --To drop the database,
 *   - (may need to run: $ brew services stop postgresql followed by $ brew services start postgresql to log all users off 'watchpotato')
 *   - dropdb cheapeats
 */