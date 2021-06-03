const { RegisterNewUser, loginUser } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: RegisterNewUser,
  },

  {
    method: 'POST',
    path: '/notes/login',
    handler: loginUser,
  }
];

module.exports = routes;
