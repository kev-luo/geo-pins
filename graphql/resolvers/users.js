const { AuthenticationError } = require("apollo-server")

// create higher order function wraps resolver functions
const authenticated = (next) => (root, args, context, info) => {
  // if there's no current user returned from our context function
  if(!context.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  // makes it possible to execute the resolver function (kinda like middleware?)
  return next(root, args, context, info);
}

// these are our resolvers. resolvers actually execute the root types. each field will have its own resolver.

module.exports = { 
  Query: {
    // resolver function for me query
    // before we execute this query we want to make sure we have a current user and to throw an error if we don't have a current user (ie login was unsuccessul)
    me: authenticated((root, args, context) => context.currentUser)
  }
}