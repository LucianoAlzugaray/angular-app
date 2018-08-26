const path = require('path');
const _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.join(__srcpath, '..')),

  // Server port
  port: process.env.PORT || 8081,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'secret_session_dgeyc',
  },
// Export the config object based on the NODE_ENV
// ==============================================
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {},
);
