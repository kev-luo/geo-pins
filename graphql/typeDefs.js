const { gql } = require('apollo-server');

// this is our schema definition, written in graphql's schema definition language (SDL)
// the schema defines the server's API structure (ie it's capbabilities)

module.exports = gql`
  # our schema has a User type, defining the structure of our User model. Each type will have one or more fields.
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    # we can get this createdAt field in our mongoose model by using { timestamps: true } in our mongoose model
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  # in order to add functionality to our API we need to add ROOT types: Query/Mutation/Subscription
  # root types define our entry points for our API. they define the shape of our queries and mutations that will be accepted by the server. Note that while root type definitions allow us to send queries and mutations to our server, they won't be executed until we write our resolvers.
  # defining the Query root type with the 'me' field allows us to write the following query:
    # query {
    #   me {
    #     _id
    #     name
    #     email
    #     picture
    #   }
    # }
  type Query {
    me: User
  }
`