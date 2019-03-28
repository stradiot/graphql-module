// const { ApolloServer } = require('apollo-server');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const fs = require('fs');
const https = require('https');
const http = require('http');

// const server = new ApolloServer({ schema });
//
// server.listen({ port: 4000 }, () => {
//     console.log(`Server ready at http://localhost:4000`);
// });
//

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'example.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}


const apollo = new ApolloServer({ schema });
const app = express();
apollo.applyMiddleware({ app });

const server = http.createServer(app);

// const server = https.createServer(
//   {
//     cert: fs.readFileSync(`./ssl/server.crt`),
//     key: fs.readFileSync(`./ssl/server.key`)
//   },
//   app
// );
apollo.installSubscriptionHandlers(server);

server.listen({ port: 4000 }, () =>  console.log('🚀 Server ready at 4000'));
