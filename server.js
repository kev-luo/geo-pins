require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 4000;

// wiring up back end server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  // connecting to db
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // connecting to apollo server
  .then(() => {
    console.log('db connected');
    return server.listen({ port: PORT })
  })
  // ensure apollo server is connected
  .then(({ url }) => {
    console.log(`Server listening on ${ url }`)
  })
  .catch(err => console.log(err))
