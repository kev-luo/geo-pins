const usersResolvers = require('./users');
const pinsResolvers = require('./pins');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...pinsResolvers.Query
  },
  Mutation: {
    ...pinsResolvers.Mutation
  }
}