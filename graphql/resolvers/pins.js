const Pin = require('../../models/Pin');
const { AuthenticationError } = require("apollo-server");

const authenticated = next => (root, args, context, info) => {
  if(!context.currentUser) {
    throw new AuthenticationError("You must be logged in to create a ping");
  }
  return next(root, args, context, info);
}

module.exports = {
  Mutation: {
    createPin: authenticated(async (root, args, context) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id
      }).save()
      const pinAdded = await Pin.populate(newPin, 'author');
      return pinAdded
    })
  }
}