const user = {
  _id: "1",
  name: "kevin",
  email: "kevin@kevin.com",
  picture: "https://cloudinary.com/asdf"
}

module.exports = { 
  Query: {
    // resolver function for me query
    me: () => user
  }
}