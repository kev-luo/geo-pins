const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

// wiring up back end server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen()
  .then(({ url }) => console.log(`Server listening on ${ url }`))