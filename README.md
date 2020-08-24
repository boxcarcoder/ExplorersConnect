# ExplorersConnect
A social network for outdoor enthusiasts. 

Join the community to meet outdoor enthusiasts just like yourself.
Share your favorite outdoor recreations, the beautiful places you've explored, and the reliable gear that got you there.

Planning a trip? Wondering what gear suits your needs? Start a discussion within the community.

## Overview
This application was built with the MERN stack.

The backend RESTful API and server is built with Node.js and Express, communicating with Atlas MongoDB for cloud storage. Models are built with Mongoose using schemas, while controllers are implemented using Mongoose for CRUD operations. Protected endpoints are built with JSON Web Tokens to check for authentication.

The frontend is built with React, as well as React Redux for state management. Actions and reducers are utilized to provide state from the database to the React components. Styling for components are implemented with SCSS. 

This application is written following ES6+ conventions, including arrow functions, React Hooks, and async/await for asynchronous operations.

## Testing
This application's backend has been tested through integration testing. The application's REST API along with a test database is tested using Supertest and Jest. These tests can be found in ./tests which contains tests for each API route.

## Demo
This application is deployed to Heroku:
https://thawing-ridge-40357.herokuapp.com/







