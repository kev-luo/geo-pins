# geo-pins
Realtime application built with React and GraphQL. More GraphQL learning.

Thank you to Reed Barger who provided the starter template for this application. 

[Starter template courtesy of Reed Barger](https://github.com/reedbarger/GeoPins)

### Practices
- Higher order components
- Material UI themes
- google OAuth


<!-- google Oauth overview -->
<!-- Login Component -->
  <!-- After successfully logging in, we request the current user data and make a request to our backend server to execute the 'me' query. In our request we pass through the idToken from the successful login -->
  <!-- this request is made using the graphql-request library -->
<!-- Server.js (backend) -->
  <!-- within the context of ApolloServer, we intercept the request being made, and take the passed in idToken to verify that it's valid. -->
  <!-- if the authToken is null that means they did not log in. -->
<!-- userController.js -->
  <!-- we verify the idToken and return the google user info -->
  <!-- we check if the google user exists in our db, and send it back to Server.js if they do exist in our db. if not we create a new user in our db and send that back to Server.js -->
  <!-- if the idToken is unverifiable then we console log an error -->
<!-- Server.js -->
  <!-- with the current user returned from userController.js, we return the currentUser inside ApolloServer's context parameter as currentUser, giving our resolvers access to the currentUser -->
<!-- users.js (resolver) -->
  <!-- our 'me' query is wrapped in a higher order function which checks if the login was successful.  -->
  <!-- if there is no currentUser in the context object then we throw an authentication error -->
  <!-- if there is a currentUser, the resolver returns the currentUser from the context object and is sent back to our Login Component with the currentUser information based on what we requested in our query -->

<!-- store user info on front end -->
  
