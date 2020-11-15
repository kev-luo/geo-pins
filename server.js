require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const findOrCreateUser = require('./controllers/userController');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 4000;

// wiring up back end server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context can either be a fxn or an object. we've made it a fxn to grab the request that's being made from the parameters of context
  // req allows us to get the headers that are being sent over
  context: async ({ req }) => {
    // set initial authToken to null
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization
      // if the authToken is not falsey we'll either try to find the user in our db or create a new user
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch(err) {
      console.error(`Unable to authenticate user with token ${ authToken }`)
    }
    // make current user available to resolvers in order to conditionally execute queries based on whether we have a user or not
    return { currentUser }
  }
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
