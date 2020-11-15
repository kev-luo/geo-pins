const { gql } = require('apollo-server');

// this is our schema, written in graphql's schema definition language (SDL)
// the schema defines the server's API

module.exports = gql`
  # our schema has a User type, defining the structure of our User model
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  # in order to add functionality to our API we need to add ROOT types: Query/Mutation/Subscription
  # root types define our entry points for our API
  type Query {
    me: User
  }
`