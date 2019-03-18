const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const RootQuery = require('./queries/RootQuery');
const Mutation = require('./mutations/Mutation');
const Subscription = require('./subscriptions/Subscription');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription
});
