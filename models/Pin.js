const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  latitude: Number,
  longitude: Number,
  // mongoose can now 'populate' this author field with all the author information
  author: { 
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: [
    {
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      },
      author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    }
  ]
}, { timestamps: true }) // this will give each pin createdAt and updatedAt fields

module.exports = mongoose.model("Pin", pinSchema);