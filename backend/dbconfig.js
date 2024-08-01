const Pool = require('pg').Pool;
const config = require('config');

const pool = new Pool({
	user: config.get('Database.user'),
	password: config.get('Database.password'),
	host: config.get('Database.host'),
	port: config.get('Database.port'),
	database: config.get('Database.database'),
});

module.exports = pool;