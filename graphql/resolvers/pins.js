const Pin = require('../../models/Pin');
const { AuthenticationError } = require("apollo-server");

const authenticated = next => (root, args, context, info) => {
  if(!context.currentUser) {
    throw new AuthenticationError("You must be logged in to create a ping");
  }
  return next(root, args, context, info);
}

module.exports = {
  Query: {
    getPins: async (root, args, context) => {
      const pins = await Pin.find({}).populate('author').populate('comments.author');
      return pins
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, context) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id
      }).save()
      const pinAdded = await Pin.populate(newPin, 'author');
      return pinAdded
    }),
    deletePin: authenticated(async (root, args, context) => {
      const pinDeleted = await Pin.findOneAndDelete({_id: args.pinId}).exec()
      return pinDeleted;
    })
  }
}