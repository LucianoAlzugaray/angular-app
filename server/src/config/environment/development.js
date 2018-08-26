// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connecton opions
  sequelize: {
    username: 'postgres',
    password: 'postgres',
    database: 'estadistica_web_db', // db name
    host: '127.0.0.1', 		// i.e. localhost
    dialect: 'postgres',	// type of db
    makeUri() {
      return `postgres://${this.username}:${this.password}@localhost:5432/${this.database}`
    }
  }
};

