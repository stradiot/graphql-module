const { ApolloServer } = require('apollo-server');
const schema = require('./schema/schema');

const server = new ApolloServer({ schema });

server.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000`);
});
