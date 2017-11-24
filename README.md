UI React Simple App
===============

This repository holds the User Interface of the app using React components.

 - Authentication system using JWT
 - Simple routing system
 - Requires three Server API End-points
   - `/login` returns the user data
   - `/logs` returns the list of logs
   - `/nodes` returns the list of Nodes

It's coded on **TypeScript** with **[JavaScript Standard Style](https://standardjs.com/)** and it's built with **Webpack**.

The stack is:
  - **React/Redux**
  - **React toolbox UI components**
  - **CSS Modules**
  - **postCSS**

## NPM Scripts

### Run

Runs a webpack-dev-server at http://localhost:8080

    npm start

### Build

Builds a distribution version in the *build* directory

    npm run build

### Test the front-end with a mocked server API

In a terminal run the front-end

    npm run test:front

In another terminal run the JSON server

    npm run test:server

Open the browser at http://localhost:8080 and use any `user/password` to log in.

### Deploy

Deploy a distribution version in the http://irespond.surge.sh domain

    npm run deploy
