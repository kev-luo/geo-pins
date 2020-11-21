const Pin = require("../../models/Pin");
const User = require("../../models/User");
const { AuthenticationError, PubSub } = require("apollo-server");

const pubsub = new PubSub();
const PIN_ADDED = "PIN_ADDED";
const PIN_DELETED = "PIN_DELETED";
const PIN_UPDATED = "PIN_UPDATED";

const authenticated = (next) => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You must be logged in to create a ping");
  }
  return next(root, args, context, info);
};

module.exports = {
  Query: {
    getPins: async (root, args, context) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");
      return pins;
    },
  },
  Mutation: {
    createPin: authenticated(async (root, args, context) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id,
      }).save();
      const pinAdded = await Pin.populate(newPin, "author");
      // to publish the data changes from createPin, we need access to the return value of the createPin resolver
      // now whenever we create a new pin (pinAdded variable), it will be published with our PIN_ADDED subscription
      // the mutation resolvers publish the data, and the front end calls the subscription query to subscribe to the published data
      pubsub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, context) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      pubsub.publish(PIN_DELETED, { pinDeleted });
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, context) => {
      const newComment = { text: args.text, author: context.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true } // getting back the updated document in the return
      )
        .populate("author")
        .populate("comments.author");
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    }),
  },
  Subscription: {
    // resolver for pinAdded
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED),
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED),
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED),
    },
  },
};
