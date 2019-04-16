const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const https = require('https');
const auth = require('basic-auth');
const cors = require('cors');
const fs = require('fs');
const schema = require('./schema/schema');
const { port, certificatePath, privateKeyPath, user, pass } = require('./config');

const apollo = new ApolloServer({ schema });

const app = express();

app.use(cors());
app.use((req, res, next) => {
    const credentials = auth(req);

    if (!credentials || credentials.name !== user || credentials.pass !== pass) {
        res.set('WWW-Authenticate', 'Basic realm="IoThings"');
        res.status(401).send(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    next();
});

apollo.applyMiddleware({ app });

const server = https.createServer(
  {
    cert: fs.readFileSync(certificatePath),
    key: fs.readFileSync(privateKeyPath)
  },
  app
);
apollo.installSubscriptionHandlers(server);

server.listen({ port }, () =>  console.log(`Server ready at ${port}`));
