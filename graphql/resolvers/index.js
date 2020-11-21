const usersResolvers = require('./users');
const pinsResolvers = require('./pins');

module.exports = {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...pinsResolvers.Mutation
  }
}