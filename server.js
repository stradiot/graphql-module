const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const { port, certificatePath, privateKeyPath } = require('./config');
const fs = require('fs');
const https = require('https');

const apollo = new ApolloServer({ schema });
const app = express();
apollo.applyMiddleware({ app });

const server = https.createServer(
  {
    cert: fs.readFileSync(certificatePath),
    key: fs.readFileSync(privateKeyPath)
  },
  app
);
apollo.installSubscriptionHandlers(server);

server.listen({ port }, () =>  console.log('🚀 Server ready at 4000'));
