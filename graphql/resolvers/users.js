const user = {
  _id: "1",
  name: "kevin",
  email: "kevin@kevin.com",
  picture: "https://cloudinary.com/asdf"
}

// these are our resolvers. resolvers actually execute the root types. each field will have its own resolver.

module.exports = { 
  Query: {
    // resolver function for me query
    me: () => user
  }
}