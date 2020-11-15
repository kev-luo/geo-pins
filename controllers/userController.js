const User = require('../models/User');
// library allowing us to verify ID token
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OATH_CLIENT_ID)

const findOrCreateUser = async(token) => {
  // verify auth token
  const googleUser = await verifyAuthToken(token);
  // check if user exists 
  const user = await checkIfUserExists(googleUser.email);
  // if user exists, return user info, else create new user in DB
  return user ? user : createNewUser(googleUser);
}

const verifyAuthToken = async(token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })
    // returns google user similar to googleUser.getAuthResponse() in Login component
    return ticket.getPayload();
  } catch(err) {
    console.error('Error verifying auth token', err);
  }
}

const checkIfUserExists = async(email) => {
  // exec() allows this to return a promise
  // https://mongoosejs.com/docs/promises.html#should-you-use-exec-with-await?
  await User.findOne({ email: email }).exec()
}

const createNewUser = (googleUser) => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save();
}

module.exports = findOrCreateUser;